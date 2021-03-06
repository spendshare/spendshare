import com.google.gson.Gson;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;
import gurobi.*;
import org.takes.Request;
import org.takes.Response;
import org.takes.Take;
import org.takes.facets.fork.FkRegex;
import org.takes.facets.fork.TkFork;
import org.takes.http.Exit;
import org.takes.http.FtBasic;
import org.takes.rq.RqPrint;
import org.takes.rs.RsJson;

import javax.json.Json;
import javax.json.JsonArrayBuilder;

public final class Server {
    public static int T = 1000000000; // INF

    public static void main(final String... args) throws Exception {
        new FtBasic(
            new TkFork(new FkRegex("/", new TkIndex())), 4000
        ).start(Exit.NEVER);

    }

    static long[][] compute(double[] input, int[][] dislikes) throws Exception {
        GRBEnv env = new GRBEnv();
        GRBModel model = new GRBModel(env);

        int inputLength = input.length;
        GRBLinExpr[] eqExprs2 = new GRBLinExpr[inputLength];
        GRBVar[][] result = new GRBVar[inputLength][inputLength];
        GRBVar[][] isExisting = new GRBVar[inputLength][inputLength];
        for (int i = 0; i < result.length; i++) {
            eqExprs2[i] = new GRBLinExpr();
            for (int j = 0; j < result[i].length; j++) {
                if (i == j) {
                    continue;
                }
                GRBVar x = model.addVar(-10000, 10000, 0.0, GRB.INTEGER, "res-" + i + "-" + j);
                result[i][j] = x;
                GRBVar isExistingVar = model.addVar(0.0, 1.0, 0.0, GRB.BINARY, "is-used-" + i + "-" + j);
                isExisting[i][j] = isExistingVar;
                if (result[j][i] != null) {
                    GRBLinExpr eq = new GRBLinExpr();
                    eq.addTerm(1.0, x);
                    eq.addTerm(1.0, result[j][i]);
                    model.addConstr(eq, GRB.EQUAL, 0, "eq-array-" + i + '-' + 'j');
                    GRBLinExpr eqi = new GRBLinExpr();
                    eqi.addTerm(1.0, isExistingVar);
                    eqi.addTerm(-1.0, isExisting[j][i]);
                    model.addConstr(eqi, GRB.EQUAL, 0, "eq-ex-array-" + i + '-' + 'j');

                }
                GRBLinExpr satmax = new GRBLinExpr();
                satmax.addTerm(T, isExistingVar);
                GRBVar MaxE = model.addVar(-T, T, 0.0, GRB.INTEGER, "maxE-" + i + "-" + j);
                model.addConstr(satmax, GRB.EQUAL, MaxE, "eq-ex-max-e-array-" + i + '-' + 'j');
                model.addConstr(x, GRB.LESS_EQUAL, MaxE, "res-" + i + "-" + j + "traverse-satmax");

                GRBLinExpr satmin = new GRBLinExpr();
                satmin.addTerm(-T, isExistingVar);
                GRBVar MinE = model.addVar(-T, T, 0.0, GRB.INTEGER, "minE-" + i + "-" + j);
                model.addConstr(satmin, GRB.EQUAL, MinE, "eq-ex-min-e-array-" + i + '-' + 'j');
                model.addConstr(x, GRB.GREATER_EQUAL, MinE, "res-" + i + "-" + j + "traverse-satmin");

                eqExprs2[i].addTerm(1.0, x);
            }
            model.addConstr(eqExprs2[i], GRB.EQUAL, input[i], "ea-user-" + i);
        }

        for (int[] dislike : dislikes) {
            GRBLinExpr expr = new GRBLinExpr();
            expr.addTerm(1.0, isExisting[dislike[0]][dislike[1]]);
            model.addConstr(expr, GRB.EQUAL, 0, "dislike" + dislike[0] + '-' + dislike[1]);
        }

        GRBLinExpr minimize = new GRBLinExpr();

        for (int i = 0; i < isExisting.length; i++) {
            for (int j = 0; j < isExisting[i].length; j++) {
                if (i == j) {
                    continue;
                }
                minimize.addTerm(1.0, isExisting[i][j]);
            }
        }
        model.setObjective(minimize, GRB.MINIMIZE);

        model.set(GRB.DoubleParam.TimeLimit, 2);
//        model.set(GRB.IntParam.SolutionLimit, 100);
//        model.set(GRB.DoubleParam.BestObjStop, 2.4e+1);
        model.optimize();


        long[][] res = new long[inputLength][inputLength];
        for (int i = 0; i < result.length; i++) {
            for (int j = 0; j < result[i].length; j++) {
                if (i == j) {
                    res[i][j] = 0;
                    continue;
                }
                res[i][j] = Math.round(result[i][j].get(GRB.DoubleAttr.X) * isExisting[i][j].get(GRB.DoubleAttr.X));
            }
        }

        model.dispose();
        env.dispose();

        return res;
    }
}

class Balance {
    @SerializedName("id")
    @Expose
    private String id;
    @SerializedName("value")
    @Expose
    private double value;

    double getValue() {
        return value;
    }

    String getId() {
        return id;
    }
}

class Dislike {
    @SerializedName("a")
    @Expose
    private String a;
    @SerializedName("b")
    @Expose
    private String b;

    String getA() {
        return a;
    }

    String getB() {
        return b;
    }
}

class Req {
    @SerializedName("balances")
    @Expose
    private Balance[] balances;

    @SerializedName("dislikes")
    @Expose
    private Dislike[] dislikes;

    Balance[] getBalances() {
        return balances;
    }

    Dislike[] getDislikes() {
        return dislikes;
    }
}


class TkIndex implements Take {
    @Override
    public Response act(final Request request) {
        try {
            final String body = new RqPrint(request).printBody();
            Gson gson = new Gson();
            Req req = gson.fromJson(body, Req.class);
            Balance[] balances = req.getBalances();
            Dislike[] dislikes = req.getDislikes();
            double[] plainBalances = new double[balances.length];
            for (int i = 0; i < balances.length; i++) {
                plainBalances[i] = balances[i].getValue();
            }


            int[][] plainDislikes = new int[dislikes.length][2];

            for (int i = 0; i < dislikes.length; i++) {
                int a = -1;
                for (int j = 0; j < balances.length; j++) {
                    if (balances[j].getId().equals(dislikes[i].getA())) {
                        a = j;
                        break;
                    }
                }
                int b = -1;
                for (int j = 0; j < balances.length; j++) {
                    if (balances[j].getId().equals(dislikes[i].getB())) {
                        b = j;
                        break;
                    }
                }
                plainDislikes[i][0] = a;
                plainDislikes[i][1] = b;
            }

            long[][] res = Server.compute(plainBalances, plainDislikes);


            JsonArrayBuilder jsonBuilder = Json.createArrayBuilder();

            for (int i = 0; i < res.length; i++) {
                for (int j = 0; j < res[i].length; j++) {
                    if (res[i][j] > 0) {
                        jsonBuilder.add(
                            Json.createObjectBuilder()
                                .add("who", balances[i].getId())
                                .add("whom", balances[j].getId())
                                .add("what", res[i][j])
                                .build()
                        );
                    }
                }
            }
            return new RsJson(jsonBuilder.build());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}



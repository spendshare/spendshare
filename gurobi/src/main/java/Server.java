import gurobi.*;
import org.takes.Request;
import org.takes.Response;
import org.takes.Take;
import org.takes.http.Exit;
import org.takes.http.FtBasic;
import org.takes.facets.fork.FkRegex;
import org.takes.facets.fork.TkFork;
import org.takes.rs.RsJson;
import javax.json.Json;
import java.io.IOException;
import junit.framework.*;
import java.util.ArrayList;
import static org.junit.Assert.assertEquals;
import org.junit.Test;

class SolverTest {
    private static double[][] safeCompute(double input[]) {
        try {
            return Server.compute(input);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Test
    public void evaluatesSimpleExpression() {
        double input[] = { 10, 40, -30, 16, 45, -65, 56, -70, -2 };
        double res[][] = safeCompute(input);
        assertEquals(res, 6);
    }
}

public final class Server
{

    public static void main(final String... args) throws Exception {


    }

    static double[][] compute(double input[]) throws Exception
    {
        GRBEnv env = new GRBEnv();
        GRBModel model = new GRBModel(env);

        int inputLength = input.length;
        GRBLinExpr[] eqExprs = new GRBLinExpr[inputLength];
        GRBQuadExpr[] eqExprs2 = new GRBQuadExpr[inputLength];
        GRBVar[][] result = new GRBVar[inputLength][inputLength];
        GRBVar[][] isExisting = new GRBVar[inputLength][inputLength];
        for (int i = 0; i < result.length; i++) {
            eqExprs[i] = new GRBLinExpr();
            eqExprs2[i] = new GRBQuadExpr();
            for (int j = 0; j < result[i].length; j++) {
                if(i == j) {
                    continue;
                }
                GRBVar x = model.addVar(-100, 100, 0.0, GRB.CONTINUOUS, "res-" + i + "-" + j);
                result[i][j] = x;
                GRBVar isExistingVar = model.addVar(0.0, 1.0, 0.0, GRB.BINARY, "is-used-" + i + "-" + j);
                isExisting[i][j] = isExistingVar;
                if (result[j][i] != null) {
                    GRBLinExpr eq = new GRBLinExpr();
                    eq.addTerm(1.0, x);
                    eq.addTerm(1.0, result[j][i]);
                    model.addConstr(eq, GRB.EQUAL, 0, "eq-array-" + i + '-' +'j');
                    GRBLinExpr eqi = new GRBLinExpr();
                    eqi.addTerm(1.0, isExistingVar);
                    eqi.addTerm(-1.0, isExisting[j][i]);
                    model.addConstr(eqi, GRB.EQUAL, 0, "eq-ex-array-" + i + '-' +'j');

                }
                eqExprs[i].addTerm(1.0, x);
                eqExprs2[i].addTerm(1.0, isExistingVar, x);
            }
            //model.addConstr(eqExprs[i], GRB.EQUAL, input[i], "ea-user-" + i);
            model.addQConstr(eqExprs2[i], GRB.EQUAL, input[i], "ea-user-" + i);
        }

        GRBLinExpr minimize = new GRBLinExpr();

        for (int i = 0; i < isExisting.length; i++) {
            for (int j = 0; j < isExisting[i].length; j++) {
                if(i == j) {
                    continue;
                }
                minimize.addTerm(1.0, isExisting[i][j]);
            }
        }
        model.setObjective(minimize, GRB.MINIMIZE);

        model.optimize();




        double[][] res = new double[inputLength][inputLength];
        for (int i = 0; i < result.length; i++) {
            for (int j = 0; j < result[i].length; j++) {
                if(i == j) {
                    res[i][j] = 0;
                }
                res[i][j] = result[i][j].get(GRB.DoubleAttr.X) * isExisting[i][j].get(GRB.DoubleAttr.X);
            }
        }

        model.dispose();
        env.dispose();

        return res;
    }

}


class TkIndex implements Take {
    @Override
    public Response act(final Request request) {
        try {
            return new RsJson(
                    Json.createObjectBuilder()
                            .add("balance", "10")
                            .build()
            );
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}



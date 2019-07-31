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
import java.util.ArrayList;

public final class Server
{

    public static void main(final String... args) throws Exception
    {
        GRBEnv env = new GRBEnv();
        GRBModel model = new GRBModel(env);

        int input[] = { 10, 40, -30, 16, 45, -65, 56, -70, -2 };
        int inputLength = input.length;
        GRBLinExpr[] eqExprs = new GRBLinExpr[inputLength];
        GRBVar[][] result = new GRBVar[inputLength][inputLength];
        GRBVar[][] isExisting = new GRBVar[inputLength][inputLength];
        for (int i = 0; i < result.length; i++) {
            eqExprs[i] = new GRBLinExpr();
            for (int j = 0; j < result[i].length; j++) {
                GRBVar x = model.addVar(-100, 100, 0.0, GRB.CONTINUOUS, "res-" + i + "-" + j);
                result[i][j] = x;
                GRBVar isExistingVar = model.addVar(0.0, 1.0, 0.0, GRB.BINARY, "is-used-" + i + "-" + j);
                isExisting[i][j] = isExistingVar;
                if (result[j][i] != null) {
                    GRBLinExpr eq = new GRBLinExpr();
                    eq.addTerm(1.0, x);
                    eq.addTerm(-1.0, result[j][i]);
                    model.addConstr(eq, GRB.EQUAL, 0, "eq-array-" + i + '-' +'j');

                }
                eqExprs[i].addTerm(1.0, x);
            }
            model.addConstr(eqExprs[i], GRB.EQUAL, input[i], "ea-user-" + i);
        }

        model.optimize();


          double[][] res = new double[inputLength][inputLength];
        for (int i = 0; i < result.length; i++) {
            for (int j = 0; j < result[i].length; j++) {
                res[i][j] = result[i][j].get(GRB.DoubleAttr.X);
            }
        }

        model.dispose();
        env.dispose();


        System.out.println("XX");



//        System.out.println("XXX");
//        GRBEnv env = new GRBEnv();
//        new FtBasic(
//                new TkFork(new FkRegex("/", new TkIndex())), 8080
//        ).start(Exit.NEVER);
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

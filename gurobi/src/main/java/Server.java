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
        int input[] = { 10, 40, -30, 16, 45, -65, 56, -70, -2 };
        int inputLength = input.length;
        GRBEnv[][] result = new GRBEnv[inputLength][inputLength];
        for (GRBEnv[] res: result) {
            for (int i = 0; i < res.length; i++) {
                res[i] = new GRBEnv();
            }
        }

        System.out.println("XXX");
        GRBEnv env = new GRBEnv();
        new FtBasic(
                new TkFork(new FkRegex("/", new TkIndex())), 8080
        ).start(Exit.NEVER);
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

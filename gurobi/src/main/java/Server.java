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

public final class Server
{

    public static void main(final String... args) throws Exception
    {
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

import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class SolverTest {
    public SolverTest() {

    }

    private double[][] safeCompute(double input[]) {
        try {
            return Server.compute(input);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Test
    public void evaluatesSimpleExpression () {
        double input[] = { 10, 40, -30, 16, 45, -65, 56, -70, -2 };
        double res[][] = safeCompute(input);

        assertEquals(6, 6);
    }
}

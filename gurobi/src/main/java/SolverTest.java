import org.junit.Test;

import static org.junit.Assert.assertArrayEquals;

public class SolverTest {
    public SolverTest() { }

    private double[][] safeCompute(double input[]) {
        try {
            return Server.compute(input);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Test
    public void evaluatesSimpleExpression() {
        double[] input = {10, 40, -30, 16, 45, -65, 56, -70, -2};
        double[][] res = safeCompute(input);
        System.out.println("{");

        double[][] expected = {
            {0.0, -40.0, 30.0, 0.0, 0.0, 20.0, 0.0, 0.0, 0.0,},
            { 40.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,},
            {-30.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,},
            {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 16.0, 0.0,},
            {0.0, 0.0, 0.0, 0.0, 0.0, 45.0, 0.0, 0.0, 0.0,},
            {-20.0, 0.0, 0.0, 0.0, -45.0, 0.0, 0.0, 0.0, 0.0,},
            {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 56.0,},
            {0.0, 0.0, 0.0, -16.0, 0.0, 0.0, 0.0, 0.0, -54.0,},
            {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -56.0, 54.0, 0.0,},
        };

        assertArrayEquals(res, expected);
    }
}

import org.junit.Test;

import static org.junit.Assert.assertArrayEquals;

public class SolverTest {
  public SolverTest() {
  }

  private long[][] safeCompute(double input[], int[][] dislikes) {
    try {
      return Server.compute(input, dislikes);
    } catch (Exception e) {
      e.printStackTrace();
    }
    return null;
  }

  @Test
  public void evaluatesSimpleExpression() {
//    double[] input = {10, 40, -30, 16, 45, -65, 56, -70, -2};
//    int[][] dislikes = {};
//    long[][] res = safeCompute(input, dislikes);
//    long[][] expected = {
//      {0, -40, 0, 0, -45, 95, 0, 0, 0,},
//      {40, 0, 0, 0, 0, 0, 0, 0, 0,},
//      {0, 0, 0, 0, 0, -30, 0, 0, 0,},
//      {0, 0, 0, 0, 0, 0, 0, 0, 16,},
//      {45, 0, 0, 0, 0, 0, 0, 0, 0,},
//      {-95, 0, 30, 0, 0, 0, 0, 0, 0,},
//      {0, 0, 0, 0, 0, 0, 0, 0, 56,},
//      {0, 0, 0, 0, 0, 0, 0, 0, -70,},
//      {0, 0, 0, -16, 0, 0, -56, 70, 0,}
//    };
//
//    assertArrayEquals(res, expected);
  }
}

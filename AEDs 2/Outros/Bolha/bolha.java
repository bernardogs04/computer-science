public class bolha{

    public static void ordenar(int[] vetor) {
        int i, j, troca;

        for (i = 0; i < 10 - 1; i++) {
            for (j = 0; j < 10 - 1 - i; j++) {
                if (vetor[j] > vetor[j + 1]) {
                    troca = vetor[j];
                    vetor[j] = vetor[j + 1];
                    vetor[j + 1] = troca;
                }
            }
        }
    }

    public static void main(String[] args) {
        int[] vetor = {532, 2, 43, 7, 57, 34, 831, 403, 67, 10};

        ordenar(vetor);

        for (int i = 0; i < 10; i++) {
            System.out.printf("%d ", vetor[i]);
        }
    }
}

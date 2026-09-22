public class insercao{

	public static void ordenar(int[] vetor) {
    		int i, j, troca;

	    	for (i = 1; i < 10; i++) {
        	troca = vetor[i];
        	j = i - 1;

        	while (j >= 0 && vetor[j] > troca) {
            		vetor[j + 1] = vetor[j];
            		j--;
        	}

        	vetor[j + 1] = troca;
    		}
	}

	public static void main() {
    		int[] vetor = {52, 12, 94, 71, 7, 358, 83, 40, 67, 110};

    		ordenar(vetor);

    		for (int i = 0; i < 10; i++) {
        		System.out.printf("%d ", vetor[i]);
    		}
    	}
}

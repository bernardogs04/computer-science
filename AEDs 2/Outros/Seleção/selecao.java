public class selecao{
	public static void ordenar(int[] vetor){
		for (int i = 0; i < 9; i++){
			int menor = i;
			for (int j = i+1; j < 10; j++){
				if (vetor[j] < vetor[menor]){
				menor = j;
				}
			}
		int temp = vetor[i];
		vetor[i] = vetor[menor];
		vetor[menor] = temp;
		}
	}	
	
	public static void main(String[] args){
		int[] vetor = {14, 34, 4, 31, 7, 12, 46, 100, 98, 86};
		
		ordenar(vetor);

		for (int i = 0; i < 10; i++){
			System.out.printf ("%d ", vetor[i]);
		}
	}
}

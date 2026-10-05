#include <stdio.h>

void selecao(int vetor[20]){
	for (int i = 0; i < 20-1; i++){
		int menor = i;
		for (int j = i+1; j < 20; j++){
			if(vetor[j] < vetor[menor]){
				menor = j;
				}
			}
		int temp = vetor[i];
		vetor[i] = vetor[menor];
		vetor[menor] = temp;
		}
}

int main(){
	int vetor[20] = {20, 3, 15, 54, 13, 2, 1, 0, 35, 23, 123 ,4 ,7 ,56 ,79 ,45 ,24 ,9 ,87 , 67};
	selecao(vetor);

	for (int i = 0; i < 20; i++){
		printf ("%d ", vetor[i]);
	}
	return 0;
}

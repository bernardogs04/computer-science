#include <stdio.h>
void inversao(char vetor[], int tamanho){ // metodo para inverter a string
	char intermediador;
	for (int i = 0; i < (tamanho/2); i++){ // nao preciso percorrer a string toda pra inverter, basta percorrer metade do vetor
		intermediador = vetor[i]; // processo para inverter a string
		vetor[i] = vetor [tamanho - i - 1];
		vetor[tamanho - i - 1] = intermediador;
	}
	printf ("%s", vetor);

}	

int main(){
	char vetor[50];
	int tamanho;

	//fgets (vetor, 50, stdin);
	scanf ("%[^\n]",vetor);

	while (vetor[0] != 'F' && vetor[1] != 'I' && vetor[2] != 'M'){ //loop on até achar a palavra FIM
		tamanho=0;
		while (vetor[tamanho] != '\0'){ // descobrir o tamanho da palavra
			tamanho++;
		}
		inversao(vetor, tamanho); // chamar o metodo de inversao
		scanf ("%[^\n]",vetor);
	}
	return 0;
}

#include <stdio.h>

void inversao(char vetor[], int tamanho, int contador){
	char temp;
	if (contador >= tamanho/2){ // caso chegue na metade do vetor a funcao retorna
		return;
	}
	else{
		temp = vetor[contador]; // processo de troca de posicoes no vetor
		vetor[contador] = vetor [tamanho - contador - 1];
		vetor[tamanho - contador - 1] = temp;
		inversao (vetor, tamanho, contador + 1);
	}
}

int main(){
	char vetor[50]; 
	int tamanho = 0, contador;
	fgets (vetor, 50, stdin);

 	while (!(vetor[0] == 'F' && vetor[1] == 'I' && vetor[2] == 'M' && (vetor[3] == '\0' || vetor[3] == '\n'))){ // verifica se a palavra é FIM, caso seja para o loop
		while (vetor[tamanho] != '\0'){ // calcula o tamanho do vetor
        		tamanho++;
    		}	
		vetor[tamanho - 1] = '\0';	// transforma a penultima posicao em \0
		inversao (vetor, tamanho - 1 , contador = 0); // chama a funcao que inverte o vetor
		printf ("%s\n", vetor);
		tamanho = 0;
		fgets (vetor, 50, stdin);	
	}
	return 0;
}

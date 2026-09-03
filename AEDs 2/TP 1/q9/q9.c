#include <stdio.h>

void ciframento(char vetor[], int tamanho, int contador){ // funcao que faz o ciframento
	if (contador >= tamanho){
		return; // quando chega no fim do vetor retorna
	}
	else{
		vetor[contador] = vetor [contador] + 3; // transforma a letra na letra 3 posicoes depois dela no alfabeto
		ciframento (vetor, tamanho, contador + 1); // chama a funcao recursiva, avançando uma letra
	}
}

int main(){
	char vetor[500]; 
	int tamanho = 0, contador;
	fgets (vetor, 500, stdin);

 	while (!(vetor[0] == 'F' && vetor[1] == 'I' && vetor[2] == 'M' && (vetor[3] == '\0' || vetor[3] == '\n'))){ // verifica se a palavra é FIM, caso seja para o loop
		while (vetor[tamanho] != '\0'){ // calcula o tamanho do vetor
        		tamanho++;
    		}	
		ciframento (vetor, tamanho, contador = 0); // chama a funcao de ciframento
		printf ("%s\n", vetor);
		tamanho = 0; //
		fgets (vetor, 500, stdin);	
	}
	return 0;
}

#include <stdio.h>

void verificacao(char vetor1[], char vetor2[], int tamanho1, int tamanho2){

    int usado[50]; // variavel para controlar que a mesma letra nao seja contada mais uma vez
    for (int i = 0; i < tamanho2; i++) {
        usado[i] = 0;
    }

    for (int i = 0; i < tamanho1; i++) { // for criado para converter todas as letras maiusculas em minusculas
        if (vetor1[i] >= 'A' && vetor1[i] <= 'Z') vetor1[i] += 32;
        if (vetor2[i] >= 'A' && vetor2[i] <= 'Z') vetor2[i] += 32;
    }

    for (int i = 0; i < tamanho1; i++) { // para cada letra do vetor1, procura se tem ela no vetor2
        int achou = 0;

        for (int j = 0; j < tamanho2; j++) {
            if (vetor1[i] == vetor2[j] && usado[j] == 0) {
                usado[j] = 1; // Marca a posição do vetor2 como já utilizada
                achou = 1;
                j = tamanho2;
            }
        }

        if (achou == 0) { // caso a letra do vetor1 nao for encontrada no vetor2, nao é anagrama
   	    printf("NAO\n");
            return;
        }
    }

    printf("SIM\n"); // caso de tudo certo, a palavra é anagrama
}
int main(){
	char vetor1[500];
	char vetor2[500];
	int tamanho1 = 0;
	int tamanho2 = 0;

	scanf ("%s", vetor1);

	while (!(vetor1[0] == 'F' && vetor1[1] == 'I' && vetor1[2] == 'M' && vetor1[3] == '\0')){ // caso seja digitado FIM, cancela o loop
		scanf ("%s", vetor2);
		while (vetor1[tamanho1] != '\0'){ // verifica o tamanho do primeiro vetor
        		tamanho1++;
		}
		while (vetor2[tamanho2] != '\0'){ // verifica o tamanho do segundo vetor
        		tamanho2++;
    		}

	if (tamanho1 != tamanho2){ // caso sejam de tamanhos diferentes, conclui-se que nao é anagrama
        	printf("NAO\n");
		}
	else{
		verificacao(vetor1, vetor2, tamanho1, tamanho2); // caso sejam de tamanhos iguais, chama a funcao que verifica se é anagrama
		}

        tamanho1 = 0; // zerando as variaveis e lendo um novo vetor para a proxima verificacao
        tamanho2 = 0;
	scanf ("%s", vetor1);
    }
}










}


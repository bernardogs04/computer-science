#include <stdio.h>
#include <string.h>

int tamanho;
char alunos[100][21];

void organizar(){
	for (int i = 0; i < tamanho-1; i++){
		int menor = i;
		for (int j = i+1; j < tamanho; j++){
			if (strcmp(alunos[j], alunos[menor]) < 0){
				menor = j;
			}
		}
		char temp[21];
		strcpy(temp, alunos[i]);
		strcpy(alunos[i], alunos[menor]);
		strcpy(alunos[menor], temp);
	}
}

int main(){
	scanf("%d", &tamanho);
	while (tamanho < 0 || tamanho > 100){
		printf("Numero deve ser maior que 0 e menor que 100\n");
		scanf("%d", &tamanho);
	}

	char sinal[2];
	char nome[21];
	int bom = 0, ruim = 0;

	for (int i = 0; i < tamanho; i++){
		scanf("%s %s", sinal, nome);

		if (sinal[0] == '+'){
			bom++;
		}
		if (sinal[0] == '-'){
			ruim++;
		}

		strcpy(alunos[i], nome);
	}

	organizar();

	for (int i = 0; i < tamanho; i++){
		printf("%s\n", alunos[i]);
	}

	printf("Se comportaram: %d | Nao se comportaram: %d\n", bom, ruim);

	return 0;
}

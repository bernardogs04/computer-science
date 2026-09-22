#include <stdio.h>

int vetor[10];
int contador = 0;

void inserirInicio(int valor){
	if (contador >= 10){
		printf("Vetor cheio\n");
		return;
	}
	for (int i = contador; i > 0; i--){
		vetor[i] = vetor[i - 1];
	}
	vetor[0] = valor;
	contador++;
}

void inserirFim(int valor){
	if (contador >= 10){
		printf("Vetor cheio\n");
		return;
	}
	vetor[contador] = valor;
	contador++;
}

int removerInicio(){
	if (contador == 0){
		printf("Vetor vazio\n");
		return -1;
	}
	int valorRetirado = vetor[0];
	for (int i = 0; i < contador - 1; i++){
		vetor[i] = vetor[i + 1];
	}
	contador--;
	return valorRetirado;
}

int removerFim(){
	if (contador == 0){
		printf("Vetor vazio\n");
		return -1;
	}
	contador--;
	return vetor[contador];
}

void imprimirVetor(){
	printf("Vetor atual: ");
	for (int i = 0; i < contador; i++){
		printf("%d ", vetor[i]);
	}
	printf("\n");
}

int main(){
	int valor, opcao, valorRetirado;

	printf("0-Sair, 1-Inserir no inicio, 2-Inserir no fim, 3-Remover no inicio, 4-Remover no final\n");
	scanf("%d", &opcao);

	while (opcao != 0){

		if (opcao == 1){
			printf("Valor: ");
			scanf("%d", &valor);
			inserirInicio(valor);
			imprimirVetor();
		}
		else if (opcao == 2){
			printf("Valor: ");
			scanf("%d", &valor);
			inserirFim(valor);
			imprimirVetor();
		}
		else if (opcao == 3){
			valorRetirado = removerInicio();
			if (valorRetirado != -1){
				printf("Valor removido: %d\n", valorRetirado);
			}
			imprimirVetor();
		}
		else if (opcao == 4){
			valorRetirado = removerFim();
			if (valorRetirado != -1){
				printf("Valor removido: %d\n", valorRetirado);
			}
			imprimirVetor();
		}
		else {
			printf("Opcao invalida\n");
		}

		printf("0-Sair, 1-Inserir no inicio, 2-Inserir no fim, 3-Remover no inicio, 4-Remover no final\n");
		scanf("%d", &opcao);
	}

	return 0;
}

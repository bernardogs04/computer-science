#include <stdio.h>

int vetor[10];
int contador = 0;

void inserirFim(int valor){
	if (contador >= 10){
		printf("Fila cheia\n");
		return;
	}
	vetor[contador] = valor;
	contador++;
}

int removerInicio(){
	if (contador == 0){
		printf("Fila vazia\n");
		return -1;
	}
	int valorRetirado = vetor[0];
	for (int i = 0; i < contador - 1; i++){
		vetor[i] = vetor[i + 1];
	}
	contador--;
	return valorRetirado;
}

void imprimirVetor(){
	printf("Fila atual (inicio -> fim): ");
	for (int i = 0; i < contador; i++){
		printf("%d ", vetor[i]);
	}
	printf("\n");
}

int main(){
	int valor, opcao, valorRetirado;

	printf("0-Sair, 1-Inserir (enqueue), 2-Remover (dequeue)\n");
	scanf("%d", &opcao);

	while (opcao != 0){

		if (opcao == 1){
			printf("Valor: ");
			scanf("%d", &valor);
			inserirFim(valor);
			imprimirVetor();
		}
		else if (opcao == 2){
			valorRetirado = removerInicio();
			if (valorRetirado != -1){
				printf("Valor removido: %d\n", valorRetirado);
			}
			imprimirVetor();
		}
		else {
			printf("Opcao invalida\n");
		}

		printf("0-Sair, 1-Inserir (enqueue), 2-Remover (dequeue)\n");
		scanf("%d", &opcao);
	}

	return 0;
}

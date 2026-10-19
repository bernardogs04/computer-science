#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

typedef struct{
    int ano;
    int mes;
    int dia;
} Data;

typedef struct{
    int id;
    char marca[100];
    char modelo[100];
    int ano;
    char categoria[100];
    char combustivel[5][100];
    int numCombustivel;
    int cilindros;
    double cilindrada;
    char transmissao[100];
    char tracao[100];
    double consumoCidade;
    double consumoEstrada;
    double co2;
    int turbo;
    Data dataRegistro;
} Veiculo;

Data parseData(char *a){
    Data data;
    data.ano = 0;
    data.mes = 0;
    data.dia = 0;
    sscanf(a, "%d-%d-%d", &data.ano, &data.mes, &data.dia);
    return data;
}

void formatData(Data d, char *resposta)
{
    sprintf(resposta, "%02d/%02d/%04d", d.dia, d.mes, d.ano);
}

Veiculo *parseVeiculo(char *s)
{

    Veiculo *carro = (Veiculo *)malloc(sizeof(Veiculo));
    if (carro == NULL)
        return NULL;

    char *dados;

    dados = strtok(s, ",");
    sscanf(dados, "%d", &carro->id);

    dados = strtok(NULL, ",");
    sprintf(carro->marca, "%s", dados);

    dados = strtok(NULL, ",");
    sprintf(carro->modelo, "%s", dados);

    dados = strtok(NULL, ",");
    sscanf(dados, "%d", &carro->ano);

    dados = strtok(NULL, ",");
    sprintf(carro->categoria, "%s", dados);

    dados = strtok(NULL, ",");
    char combTemp[100];
    sprintf(combTemp, "%s", dados);

    dados = strtok(NULL, ",");
    sscanf(dados, "%d", &carro->cilindros);

    dados = strtok(NULL, ",");
    sscanf(dados, "%lf", &carro->cilindrada);

    dados = strtok(NULL, ",");
    sprintf(carro->transmissao, "%s", dados);

    dados = strtok(NULL, ",");
    sprintf(carro->tracao, "%s", dados);

    dados = strtok(NULL, ",");
    sscanf(dados, "%lf", &carro->consumoCidade);

    dados = strtok(NULL, ",");
    sscanf(dados, "%lf", &carro->consumoEstrada);

    dados = strtok(NULL, ",");
    sscanf(dados, "%lf", &carro->co2);

    dados = strtok(NULL, ",");
    if (strcmp(dados, "true") == 0){
        carro->turbo = true;
    }
    else
    {
        carro->turbo = false;
    }

    dados = strtok(NULL, ",");
    dados[10] = '\0';

    carro->dataRegistro = parseData(dados);

    char *partes = strtok(combTemp, ";");
    carro->numCombustivel = 0;

    while (partes != NULL)
    {
        sprintf(carro->combustivel[carro->numCombustivel], "%s", partes);
        carro->numCombustivel++;
        partes = strtok(NULL, ";");
    }
    return carro;
}

void formatVeiculo(Veiculo *carro, char *resultado)
{

    char data[20];
    formatData(carro->dataRegistro, data);

    char combustivel[200];
    int pos = 0;

    sprintf(combustivel + pos, "[");
    pos++;

    for (int i = 0; i < carro->numCombustivel; i++)
    {
        if (i > 0)
        {
            pos += sprintf(combustivel + pos, ",%s", carro->combustivel[i]);
        }
        else
        {
            pos += sprintf(combustivel + pos, "%s", carro->combustivel[i]);
        }
    }
    pos += sprintf(combustivel + pos, "]");

    char turbo[10];
    if (carro->turbo)
    {
        sprintf(turbo, "true");
    }
    else
    {
        sprintf(turbo, "false");
    }

    sprintf(resultado, "[%d ## %s ## %s ## %d ## %s ## %s ## %d ## %.1lf ## %s ## %s ## %.2lf ## %.2lf ## %.1lf ## %s ## %s]", carro->id, carro->marca, carro->modelo, carro->ano, carro->categoria, combustivel, carro->cilindros, carro->cilindrada, carro->transmissao, carro->tracao, carro->consumoCidade, carro->consumoEstrada, carro->co2, turbo, data);
}

void limparLinha(char *linha)
{
    int i = 0;
    while (linha[i] != '\0' && linha[i] != '\n' && linha[i] != '\r')
    {
        i++;
    }
    linha[i] = '\0';
}

Veiculo *lerCsv(char *a, int *n)
{

    FILE *arquivo = fopen(a, "r");
    if (arquivo == NULL)
    {
        return NULL;
    }

    Veiculo *vrum = (Veiculo *)malloc(500 * sizeof(Veiculo));

    char linha[1024];

    if (fgets(linha, sizeof(linha), arquivo) == NULL)
    {
        fclose(arquivo);
        free(vrum);
        return NULL;
    }

    *n = 0;
    while (fgets(linha, sizeof(linha), arquivo) != NULL)
    {
        Veiculo *carro = parseVeiculo(linha);
        if (carro != NULL)
        {
            vrum[*n] = *carro;
            free(carro);
            (*n)++;
        }
    }

    fclose(arquivo);
    return vrum;
}

void ordenar(Veiculo* carros, int esq, int dir){
	int i = esq, j = dir;
	double pivoEstrada = carros[(dir + esq)/2].consumoEstrada;
	char pivoMarca[100];
    	strcpy(pivoMarca, carros[(dir + esq)/2].marca); 

	while (i <= j){
		while (carros[i].consumoEstrada < pivoEstrada || carros[i].consumoEstrada == pivoEstrada && strcmp(carros[i].marca, pivoMarca) < 0 ){
			i++;
		}

		while (carros[j].consumoEstrada > pivoEstrada || carros[j].consumoEstrada == pivoEstrada && strcmp(carros[j].marca, pivoMarca) > 0 ){
			j--;
		}

		if (i <= j){
			Veiculo tmp = carros[i];
			carros[i] = carros[j];
			carros[j] = tmp;
			i++;
			j--;
		}
	}

	if (esq < j){
		ordenar(carros, esq, j);
	}
	if (i < dir){
		ordenar(carros, i, dir);
	}
}



int main(){
	int n = 0;
    	Veiculo *veiculos = lerCsv("/tmp/veiculos.csv", &n);
   	Veiculo consumoEstrada[100];
   	int quantidade = 0;
   	char entrada[100];

   	while (scanf("%s", entrada) != EOF){
        	int id = atoi(entrada);
        	for (int i = 0; i < n; i++){
        		if (veiculos[i].id == id){
                		consumoEstrada[quantidade] = veiculos[i];
                		quantidade++;
            		}
        	}
    	}	

   	ordenar(consumoEstrada, 0, quantidade-1);

	char resposta[2000];
	for (int i = 0; i < quantidade; i++){
		formatVeiculo(&consumoEstrada[i], resposta);
		printf ("%s\n", resposta);
    	}

    	free(veiculos);
}

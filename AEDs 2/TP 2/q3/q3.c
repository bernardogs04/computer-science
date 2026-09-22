#include <stdio.h>
#include <string.h>

typedef struct {
	int ano;
	int mes;
	int dia;
} Data;

typedef struct {
	int id;
	char marca[100];
	char modelo[100];
	int ano;
	char categoria[100];
	char combustivel[5][100];
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

Data parseData(char* s){
	Data data;
	data.ano = 0;
	data.mes = 0;
	data.dia = 0;
	sscanf(s, "%d-%d-%d", &data.ano, &data.mes, &data.dia);
	return data;
}

void formatData(Data d, char* buffer){
	sprintf(buffer, "%02d/%02d/%04d", d.dia, d.mes, d.ano);
}

void formatDouble(double x, char* buffer){
	int precisao = 1;
	sprintf(buffer, "%.*f", precisao, x);
	double temp;
	sscanf(buffer, "%lf", &temp);
	while (precisao < 17 && temp != x) {
		precisao++;
		sprintf(buffer, "%.*f", precisao, x);
		sscanf(buffer, "%lf", &temp);
	}
}

Veiculo* parseVeiculo(char* s){
	static Veiculo v;
	char copia[1024];
	char* campos[15];
	int qtd = 0;

	sprintf(copia, "%.*s", 1024 - 1, s);

	char* token = strtok(copia, ",");
	while (token != NULL && qtd < 15) {
		campos[qtd] = token;
		qtd++;
		token = strtok(NULL, ",");
	}

	if (qtd < 15) {
		return NULL;
	}

	sscanf(campos[0], "%d", &v.id);
	sprintf(v.marca, "%.*s", 100 - 1, campos[1]);
	sprintf(v.modelo, "%.*s", 100 - 1, campos[2]);
	sscanf(campos[3], "%d", &v.ano);
	sprintf(v.categoria, "%.*s", 100 - 1, campos[4]);

	for (int i = 0; i < 5; i++) {
		v.combustivel[i][0] = '\0';
	}
	int j = 0;
	char* fuel = strtok(campos[5], ";");
	while (fuel != NULL && j < 5) {
		sprintf(v.combustivel[j], "%.*s", 100 - 1, fuel);
		j++;
		fuel = strtok(NULL, ";");
	}

	sscanf(campos[6], "%d", &v.cilindros);
	sscanf(campos[7], "%lf", &v.cilindrada);
	sprintf(v.transmissao, "%.*s", 100 - 1, campos[8]);
	sprintf(v.tracao, "%.*s", 100 - 1, campos[9]);
	sscanf(campos[10], "%lf", &v.consumoCidade);
	sscanf(campos[11], "%lf", &v.consumoEstrada);
	sscanf(campos[12], "%lf", &v.co2);
	v.turbo = (campos[13][0] == 't' || campos[13][0] == 'T');
	v.dataRegistro = parseData(campos[14]);

	return &v;
}

void formatVeiculo(Veiculo v, char* buffer){
	char combustivelStr[510];
	char cilindradaStr[32];
	char consumoCidadeStr[32];
	char consumoEstradaStr[32];
	char co2Str[32];
	char dataRegistroStr[16];
	char turboStr[8];

	int pos = sprintf(combustivelStr, "[");
	for (int i = 0; i < 5 && v.combustivel[i][0] != '\0'; i++) {
		if (i > 0) {
			pos += sprintf(combustivelStr + pos, ", ");
		}
		pos += sprintf(combustivelStr + pos, "%s", v.combustivel[i]);
	}
	sprintf(combustivelStr + pos, "]");

	formatDouble(v.cilindrada, cilindradaStr);
	formatDouble(v.consumoCidade, consumoCidadeStr);
	formatDouble(v.consumoEstrada, consumoEstradaStr);
	formatDouble(v.co2, co2Str);
	formatData(v.dataRegistro, dataRegistroStr);

	if (v.turbo) {
		sprintf(turboStr, "true");
	} else {
		sprintf(turboStr, "false");
	}

	sprintf(buffer, "[%d ## %s ## %s ## %d ## %s ## %s ## %d ## %s ## %s ## %s ## %s ## %s ## %s ## %s ## %s]", v.id, v.marca, v.modelo, v.ano, v.categoria, combustivelStr, v.cilindros, cilindradaStr, v.transmissao, v.tracao, consumoCidadeStr, consumoEstradaStr,co2Str, turboStr, dataRegistroStr);
}

void limparLinha(char* linha){
	int i = 0;
	while (linha[i] != '\0' && linha[i] != '\n' && linha[i] != '\r') {
		i++;
	}
	linha[i] = '\0';
}

Veiculo* lerCsv(char* caminhoArquivo, int* n){
	static Veiculo veiculos[5000];
	char linha[1024];
	int total = 0;
	*n = 0;

	FILE* arquivo = fopen(caminhoArquivo, "r");
	if (arquivo == NULL) {
		fprintf(stderr, "Arquivo nao encontrado: %s\n", caminhoArquivo);
		return NULL;
	}

	if (fgets(linha, 1024, arquivo) != NULL) {
		while (fgets(linha, 1024, arquivo) != NULL) {
			limparLinha(linha);
			if (linha[0] != '\0') {
				total++;
			}
		}
	}

	rewind(arquivo);
	int i = 0;
	if (fgets(linha, 1024, arquivo) != NULL) {
		while (i < 5000 && fgets(linha, 1024, arquivo) != NULL) {
			limparLinha(linha);
			if (linha[0] != '\0') {
				Veiculo* v = parseVeiculo(linha);
				if (v != NULL) {
					veiculos[i] = *v;
					i++;
				}
			}
		}
	}
	fclose(arquivo);

	*n = i;
	return veiculos;
}

void selecao(Veiculo.veiculos){
	for (int i = 0; i < 500; i++){
		int menor = i
		for (int j = 0; j < 500; j++){	
			if (strcmp(veiculos[j].modelo, veiculos[menor].modelo) < 0){
				menor = j;
			}	
		Veiculo temp = carro[i];
		carro[i] = carro[menor];
		carro[menor] = temp;	
		}
	}
}

int main(){
	Veiculo* veiculos = lerCsv("/tmp/veiculos.csv", &n);		
	
	Veiculo carro[500];
	carro = 

	return 0;
}

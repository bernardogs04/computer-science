import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;
import java.util.Locale;

class Veiculo{
	private int id;
	private String marca;
	private String modelo;
	private int ano;
	private String categoria;
	private String[] combustivel;
	private int cilindros;
	private double cilindrada;
	private String transmissao;
	private String tracao;
	private double consumoCidade;
	private double consumoEstrada;
	private double co2;
	private boolean turbo;
	private Data dataRegistro;

	public Veiculo(int id, String marca, String modelo, int ano, String categoria, String[] combustivel, int cilindros, double cilindrada, String transmissao, String tracao, double consumo_cidade, double consumo_estrada, double co2, boolean turbo, Data data_registro) {
		this.id = id;
		this.marca = marca;
		this.modelo = modelo;
		this.ano = ano;
		this.categoria = categoria;
		this.combustivel = combustivel;
		this.cilindros = cilindros;
		this.cilindrada = cilindrada;
		this.transmissao = transmissao;
		this.tracao = tracao;
		this.consumoCidade = consumo_cidade;
		this.consumoEstrada = consumo_estrada;
		this.co2 = co2;
		this.turbo = turbo;
		this.dataRegistro = data_registro;
	}

	public int getId(){
		return id;
	}
	public String getMarca(){
		return marca;
	}
	public String getModelo(){
		return modelo;
	}
	public int getAno(){
		return ano;
	}
	public String getCategoria(){
		return categoria;
	}
	public String[] getCombustivel(){
		return combustivel;
	}
	public int getCilindros(){
		return cilindros;
	}
	public double getCilindrada(){
		return cilindrada;
	}
	public String getTransmissao(){
		return transmissao;
	}
	public String getTracao(){
		return tracao;
	}
	public double getConsumoCidade(){
		return consumoCidade;
	}
	public double getConsumoEstrada(){
		return consumoEstrada;
	}
	public double getCo2(){
		return co2;
	}
	public boolean getTurbo(){
		return turbo;
	}
	public Data getDataRegistro(){
		return dataRegistro;
	}
	public void setId(int a){
		id = a;
	}
	public void setMarca(String a){
		marca = a;
	}
	public void setModelo(String a){
		modelo = a;
	}
	public void setAno(int a){
		ano = a;
	}
	public void setCategoria(String a){
		categoria = a;
	}
	public void setCombustivel(String[] a){
		combustivel = a;
	}
	public void setCilindros(int a){
		cilindros = a;
	}
	public void setCilindrada(double a){
		cilindrada = a;
	}
	public void setTransmissao(String a){
		transmissao = a;
	}
	public void setTracao(String a){
		tracao = a;
	}
	public void setConsumoCidade(double a){
		consumoCidade = a;
	}
	public void setConsumoEstrada(double a){
		consumoEstrada = a;
	}
	public void setCo2(double a){
		co2 = a;
	}
	public void setTurbo(boolean a){
		turbo = a;
	}
	public void setDataRegistro(Data a){
		dataRegistro = a;
	}

	public static Veiculo parseVeiculo(String s){
		String[] campos = s.split(",");

		int id = Integer.parseInt(campos[0]);
		String marca = campos[1];
		String modelo = campos[2];
		int ano = Integer.parseInt(campos[3]);
		String categoria = campos[4];
		String[] combustivel = campos[5].split(";");
		int cilindros = Integer.parseInt(campos[6]);
		double cilindrada = Double.parseDouble(campos[7]);
		String transmissao = campos[8];
		String tracao = campos[9];
		double consumoCidade = Double.parseDouble(campos[10]);
		double consumoEstrada = Double.parseDouble(campos[11]);
		double co2 = Double.parseDouble(campos[12]);
		boolean turbo = Boolean.parseBoolean(campos[13]);
		Data dataRegistro = Data.parseData(campos[14]);

		return new Veiculo(id, marca, modelo, ano, categoria, combustivel, cilindros, cilindrada, transmissao, tracao, consumoCidade, consumoEstrada, co2, turbo, dataRegistro);
	}

	public String format(){
		int id = getId();
		String marca = getMarca();
		String modelo = getModelo();
		int ano = getAno();
		String categoria = getCategoria();
		String[] combustivel = getCombustivel();
		int cilindros = getCilindros();
		double cilindrada = getCilindrada();
		String transmissao = getTransmissao();
		String tracao = getTracao();
		double consumoCidade = getConsumoCidade();
		double consumoEstrada = getConsumoEstrada();
		double co2 = getCo2();
		boolean turbo = getTurbo();
		Data dataRegistro = getDataRegistro();

		String combustivelStr = "[";
		for (int i = 0; i < combustivel.length; i++) {
			combustivelStr += combustivel[i];
			if (i < combustivel.length - 1) {
				combustivelStr += ",";
			}
		}
		combustivelStr += "]";

		return String.format (Locale.US,"[%d ## %s ## %s ## %d ## %s ## %s ## %d ## %.1f ## %s ## %s ## %.2f ## %.2f ## %.1f ## %b ## %s]",id, marca, modelo, ano, categoria, combustivelStr, cilindros, cilindrada, transmissao, tracao, consumoCidade, consumoEstrada, co2, turbo, dataRegistro.format());
	}
}

class Data{
	private int ano;
	private int mes;
	private int dia;

	public int getAno(){
		return ano;
	}
	public int getMes(){
		return mes;
	}
	public int getDia(){
		return dia;
	}
	public void setAno(int a){
		ano = a;
	}
	public void setMes(int a){
		mes = a;
	}
	public void setDia(int a){
		dia = a;
	}

	public static Data parseData(String s){
		String[] partes = s.split("-");
		Data data = new Data();
		data.setAno(Integer.parseInt(partes[0]));
		data.setMes(Integer.parseInt(partes[1]));
		data.setDia(Integer.parseInt(partes[2]));
		return data;
	}

	public String format(){
		return String.format("%02d/%02d/%04d", dia, mes, ano);
	}
}

class LeitorCsv{
	public static Veiculo[] ler(String caminhoArquivo){
		Veiculo[] veiculos = new Veiculo[0];

		try {
			Scanner contador = new Scanner(new File(caminhoArquivo));
			int total = 0;
			if (contador.hasNextLine()) {
				contador.nextLine();
			}
			while (contador.hasNextLine()) {
				if (contador.nextLine().length() > 0) {
					total++;
				}
			}
			contador.close();

			veiculos = new Veiculo[total];
			Scanner leitor = new Scanner(new File(caminhoArquivo));
			if (leitor.hasNextLine()) {
				leitor.nextLine();
			}
			int i = 0;
			while (leitor.hasNextLine() && i < total) {
				String linha = leitor.nextLine();
				if (linha.length() > 0) {
					veiculos[i] = Veiculo.parseVeiculo(linha);
					i++;
				}
			}
			leitor.close();
		} catch (FileNotFoundException e) {
			System.err.println("Arquivo nao encontrado: " + caminhoArquivo);
		}

		return veiculos;
	}
}

public class Q1{

	private static void merge(Veiculo[] veiculos, int esq, int dir){
		if(esq<dir){
			int meio=(esq+dir)/2;
			merge(veiculos,esq,meio);
			merge(veiculos,meio+1,dir);
			intercalar(veiculos,esq,meio,dir);
		}
	}
	public static void intercalar(Veiculo[] vetor, int esq, int meio, int dir) { 
		int nEsq = meio + 1 - esq;
    		int nDir = dir - meio;
    		Veiculo[] vetEsq = new Veiculo[nEsq];
    		Veiculo[] vetDir = new Veiculo[nDir];

   	 	// inicializar cada vetor
	 	int iEsq, iDir, i;
	    	for (iEsq = 0; iEsq < nEsq; iEsq++) {
 	       vetEsq[iEsq] = vetor[esq + iEsq];
 	   	}
 	   	for (iDir = 0; iDir < nDir; iDir++) {
 	       vetDir[iDir] = vetor[iDir + meio + 1];
 	   	}

 	   	iDir = iEsq = 0;
 	   	i = esq;
  	  	while (iEsq < nEsq && iDir < nDir) {
    	    		if (vetEsq[iEsq].getConsumoCidade() < vetDir[iDir].getConsumoCidade()){ //ordenacao atraves do consumoCidade
     	       			vetor[i++] = vetEsq[iEsq++];
			}
     	   		else if (vetEsq[iEsq].getConsumoCidade() > vetDir[iDir].getConsumoCidade()){
     	       			vetor[i++] = vetDir[iDir++];
			}
 	          	else { //caso consumoCidade seja igual, ordenacao atraves de categoria
                		if(vetEsq[iEsq].getCategoria().compareTo(vetDir[iDir].getCategoria())<=0){ //usando <= mantem estavel
					vetor[i++]=vetEsq[iEsq++];
				}
				else {
					vetor[i++]=vetDir[iDir++];
				}
			}
    		}

    		while (iEsq < nEsq) {
        		vetor[i++] = vetEsq[iEsq++];
    		}

    		while (iDir < nDir) {
       		vetor[i++] = vetDir[iDir++];
    		}
	}

	public static void main(String[] args) {

		Veiculo[] veiculos = LeitorCsv.ler("/tmp/veiculos.csv");

		Scanner scan = new Scanner(System.in); //lê o ID no pub.in

		Veiculo[] vrum = new Veiculo[500];

		int n = 0;
		int id = scan.nextInt();

		while (id != -1) {
			for (int i = 0; i < veiculos.length; i++) {
				if (veiculos[i].getId() == id) {
					vrum[n] = veiculos[i]; //quando acha o id, coloca no vrum
					n++;
				}
			}
			id = scan.nextInt();
		}
		scan.close();

		merge(vrum, 0, n-1);

		for (int i = 0; i < n; i++) { //n = quantidade de veiculos preenchidos no vrum
			System.out.println(vrum[i].format());
		}
	}
}

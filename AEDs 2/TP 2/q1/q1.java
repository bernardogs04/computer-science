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

	public Veiculo(int id, String marca, String modelo, int ano, String categoria, String combustivel, int cilindros, float cilindrada, String transmissao, String tracao, float consumo_cidade, float consumo_estrada, float co2, boolean turbo, Data data_registro) {
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
    	this.consumo_cidade = consumo_cidade;
    	this.consumo_estrada = consumo_estrada;
    	this.co2 = co2;
    	this.turbo = turbo;
    	this.dataRegistro = dataRegistro;

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
	public void setCombustivel(String a){
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
	public Data getDataRegistro(data a){
		dataRegistro = a;
	}

	public string format(){
		int id = getId();
		string marca = getMarca();
		string modelo = getModelo();
		int ano = getAno();
		string categoria = getCategoria();
		string[] combustivel = getCombustivel();
		int cilindros = getCilindros();
		double cilindrada = getCilindrada();
		string transmissao = getTransmissao();
		string tracao = getTracao();
		double consumoCidade = getConsumoCidade();
		double consumoEstrada = getConsumoEstada();
		double co2 = getCo2();
		boolean turbo = getTurbo();
		Data dataRegistro = getDataRegistro;

		String combustivelStr = "[";
    		for (int i = 0; i < combustivel.length; i++) {
        		combustivelStr += combustivel[i];
        		if (i < combustivel.length - 1) {
            			combustivelStr += ", ";
        			}
    			}
    		combustivelStr += "]";

		return String.format ("[%d ## %s ## %s ## %d ## %s ## %s ## %d ## %s ## %s ## %s ## %s ## %s ## %s ## %b ## %s]",id, marca, modelo, ano, categoria, Arrays.toString(combustivel), cilindros, cilindrada, transmissao, tracao, consumoCidade, consumoEstrada, co2, turbo, dataRegistro);
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
	public int setAno(int a){
		ano = a;
	}
	public int setMes(int a){
		mes = a;
	}
	public int setDia(int a){
		dia = a;
	}
}

public class Tp2Q1{
	public static void main(String[] args) {

        Veiculo[] veiculos = LerCSV.ler("veiculos.csv");

        Scanner scan = new Scanner(System.in);

	int IdProcurar = scan.nextInt();


		return 0;
	}
}


import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;
import java.util.Locale;

class Veiculo {
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

	public Veiculo(int id, String marca, String modelo, int ano, String categoria, String[] combustivel, int cilindros,
			double cilindrada, String transmissao, String tracao, double consumo_cidade, double consumo_estrada,
			double co2, boolean turbo, Data data_registro) {
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

	public int getId() {
		return id;
	}

	public String getMarca() {
		return marca;
	}

	public String getModelo() {
		return modelo;
	}

	public int getAno() {
		return ano;
	}

	public String getCategoria() {
		return categoria;
	}

	public String[] getCombustivel() {
		return combustivel;
	}

	public int getCilindros() {
		return cilindros;
	}

	public double getCilindrada() {
		return cilindrada;
	}

	public String getTransmissao() {
		return transmissao;
	}

	public String getTracao() {
		return tracao;
	}

	public double getConsumoCidade() {
		return consumoCidade;
	}

	public double getConsumoEstrada() {
		return consumoEstrada;
	}

	public double getCo2() {
		return co2;
	}

	public boolean getTurbo() {
		return turbo;
	}

	public Data getDataRegistro() {
		return dataRegistro;
	}

	public void setId(int a) {
		id = a;
	}

	public void setMarca(String a) {
		marca = a;
	}

	public void setModelo(String a) {
		modelo = a;
	}

	public void setAno(int a) {
		ano = a;
	}

	public void setCategoria(String a) {
		categoria = a;
	}

	public void setCombustivel(String[] a) {
		combustivel = a;
	}

	public void setCilindros(int a) {
		cilindros = a;
	}

	public void setCilindrada(double a) {
		cilindrada = a;
	}

	public void setTransmissao(String a) {
		transmissao = a;
	}

	public void setTracao(String a) {
		tracao = a;
	}

	public void setConsumoCidade(double a) {
		consumoCidade = a;
	}

	public void setConsumoEstrada(double a) {
		consumoEstrada = a;
	}

	public void setCo2(double a) {
		co2 = a;
	}

	public void setTurbo(boolean a) {
		turbo = a;
	}

	public void setDataRegistro(Data a) {
		dataRegistro = a;
	}

	public static Veiculo parseVeiculo(String s) {
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

		return new Veiculo(id, marca, modelo, ano, categoria, combustivel, cilindros, cilindrada, transmissao, tracao,
				consumoCidade, consumoEstrada, co2, turbo, dataRegistro);
	}

	public String format() {
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

		return String.format(Locale.US,
				"[%d ## %s ## %s ## %d ## %s ## %s ## %d ## %.1f ## %s ## %s ## %.2f ## %.2f ## %.1f ## %b ## %s]", id,
				marca, modelo, ano, categoria, combustivelStr, cilindros, cilindrada, transmissao, tracao,
				consumoCidade, consumoEstrada, co2, turbo, dataRegistro.format());
	}
}

class Data {
	private int ano;
	private int mes;
	private int dia;

	public int getAno() {
		return ano;
	}

	public int getMes() {
		return mes;
	}

	public int getDia() {
		return dia;
	}

	public void setAno(int a) {
		ano = a;
	}

	public void setMes(int a) {
		mes = a;
	}

	public void setDia(int a) {
		dia = a;
	}

	public static Data parseData(String s) {
		String[] partes = s.split("-");
		Data data = new Data();
		data.setAno(Integer.parseInt(partes[0]));
		data.setMes(Integer.parseInt(partes[1]));
		data.setDia(Integer.parseInt(partes[2]));
		return data;
	}

	public String format() {
		return String.format("%02d/%02d/%04d", dia, mes, ano);
	}
}

class LeitorCsv {
	public static Veiculo[] ler(String caminhoArquivo) {
		Veiculo[] conjunto = new Veiculo[500];
		int i = 0;

		try (Scanner leitor = new Scanner(new File(caminhoArquivo))) {
			if (leitor.hasNextLine()) {
				leitor.nextLine();
			}
			while (leitor.hasNextLine() && i < conjunto.length) {
				String linha = leitor.nextLine();
				if (!linha.isEmpty()) {
					conjunto[i] = Veiculo.parseVeiculo(linha);
					i++;
				}
			}
		} catch (FileNotFoundException e) {
			System.err.println("Arquivo nao encontrado: " + caminhoArquivo);
		}

		return conjunto;
	}
}


class Celula {
	private Veiculo veiculo;
	private Celula anterior;
	private Celula proximo;

	public Celula(Veiculo veiculo) {
		this.veiculo = veiculo;
		this.anterior = null;
		this.proximo = null;
	}

	public Veiculo getVeiculo() {
		return veiculo;
	}

	public Celula getAnterior() {
		return anterior;
	}

	public Celula getProximo() {
		return proximo;
	}

	public void setAnterior(Celula a) {
		;
		anterior = a;
	}

	public void setProximo(Celula a) {
		proximo = a;
	}
}

class ListaDupla {
	private class Celula {
		public Veiculo veiculo;
		public Celula prox;
		public Celula ant;

		public Celula() {
			this(null);
		}

		public Celula(Veiculo veiculo) {
			this.veiculo = veiculo;
			ant = null;
			prox = null;
		}
	}

	private Celula primeiro;
	private Celula ultimo;

	public ListaDupla() {
		this.primeiro = new Celula();
		this.ultimo = this.primeiro;
	}

	public int tamanho() {
		int tam = 0;
		Celula i = primeiro.prox;

		while (i != null) {
			tam++;
			i = i.prox;
		}

		return tam;
	}

	public void inserirInicio(Veiculo veiculo) {
		Celula tmp = new Celula(veiculo);
		tmp.ant = primeiro;
		tmp.prox = primeiro.prox;
		primeiro.prox = tmp;

		if (primeiro == ultimo) {
			ultimo = tmp;
		} else {
			tmp.prox.ant = tmp;
		}
		tmp = null;
	}

	public void inserirFim(Veiculo veiculo) {
		ultimo.prox = new Celula(veiculo);
		ultimo.prox.ant = ultimo;
		ultimo = ultimo.prox;
	}

	public void inserirPos(Veiculo veiculo, int pos) {
		int tam = tamanho();
		if (pos < 0 || pos > tam) {
			System.out.println("Posição invalida");
		} else if (pos == 0) {
			inserirInicio(veiculo);
		} else if (pos == tam) {
			inserirFim(veiculo);
		} else {
			Celula i = primeiro;
			for (int j = 0; j < pos; j++, i = i.prox)
				;

			Celula tmp = new Celula(veiculo);
			tmp.ant = i;
			tmp.prox = i.prox;
			tmp.ant.prox = tmp;
			tmp.prox.ant = tmp;

			tmp = i = null;
		}
	}

	public Veiculo removerInicio() {
		if (primeiro == ultimo) {
			System.out.println("Lista vazia");
			return null;
		}

		Celula tmp = primeiro.prox;
		Veiculo resp = tmp.veiculo;
		primeiro.prox = tmp.prox;

		if (tmp == ultimo) {
			ultimo = primeiro;

		} else {
			tmp.prox.ant = primeiro;
		}

		tmp.prox = null;
		tmp.ant = null;
		tmp = null;

		return resp;
	}

	public Veiculo removerFim() {
		if (primeiro == ultimo) {

			System.out.println("Lista vazia");
			return null;
		}

		Celula tmp = ultimo;
		Veiculo resp = tmp.veiculo;
		ultimo = ultimo.ant;

		ultimo.prox = null;
		tmp.ant = null;
		tmp = null;

		return resp;

	}

	public Veiculo removerPos(int pos) {
		int tam = tamanho();
		if (primeiro == ultimo) {
			System.out.println("Lista vazia");
			return null;
		} else if (pos >= tam || pos < 0) {
			System.out.println("Posição invalida");
			return null;
		}
		else if (pos == 0) {
			return removerInicio();
		} 
		else if (pos == tam - 1) {
			return removerFim();
		} 
		else {
			Celula i = primeiro.prox;
			for (int j = 0; j < pos; j++, i = i.prox)
				;

			Veiculo resp = i.veiculo;
			i.ant.prox = i.prox;
			i.prox.ant = i.ant;

			i.prox = null;
			i.ant = null;
			i = null;
			return resp;
		}
	}

	public void ordenar (){
		quickSort(primeiro.prox, ultimo);
	}

	public void quickSort(Celula esq, Celula dir) {
		if (esq == null || dir == null || esq == dir || esq == dir.prox) {
			return;
		}

		Celula i = esq;
		Celula j = dir;
		double pivoEstrada = esq.veiculo.getConsumoEstrada();
		String pivoMarca = esq.veiculo.getMarca();

		while (i != null && j != null && comparar(i, j) <= 0) {
			while (i != null
					&& (i.veiculo.getConsumoEstrada() < pivoEstrada || (i.veiculo.getConsumoEstrada() == pivoEstrada && i.veiculo.getMarca().compareTo(pivoMarca) < 0))) {
				i = i.prox;
			}

			while (j != null
					&& (j.veiculo.getConsumoEstrada() > pivoEstrada || (j.veiculo.getConsumoEstrada() == pivoEstrada && j.veiculo.getMarca().compareTo(pivoMarca) > 0))) {
				j = j.ant;
			}

			if (i != null && j != null && comparar(i, j) <= 0) {
				Veiculo temp = i.veiculo;
				i.veiculo = j.veiculo;
				j.veiculo = temp;
				if (i == dir) {
					i = null;
				} else {
					i = i.prox;
				}
				if (j == esq) {
					j = null;
				} else {
					j = j.ant;
				}
			}
		}

		if (comparar(esq, j) < 0) {
			quickSort(esq, j);
		}
		if (comparar(i, dir) < 0) {
			quickSort(i, dir);
		}
	}

	private int comparar(Celula a, Celula b) {
		if (a == b)
			return 0;
		if (a == null || b == null)
			return 1;

		Celula temp = a;
		while (temp != null) {
			if (temp == b) {
				return -1;
			}
			temp = temp.prox;
		}
		return 1; // a vem depois de b
	}

	public void mostrar() {
		Celula i = primeiro.prox;
		while (i != null){
			System.out.println(i.veiculo.format());
			i = i.prox;
		}
	}
}

public class Q5 {
	public static void main(String[] args) {
		Veiculo[] veiculos = LeitorCsv.ler("/tmp/veiculos.csv");
		ListaDupla lista = new ListaDupla();
		Scanner scan = new Scanner(System.in);
		int num = scan.nextInt();

		while (num != -1) {
			for (int i = 0; i < veiculos.length; i++) {
				if (veiculos[i].getId() == num) {
					lista.inserirFim(veiculos[i]);
				}
			}
			num = scan.nextInt();
		}
		scan.close();
		lista.ordenar();
		lista.mostrar();

	}
}

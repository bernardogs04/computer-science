import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;
import java.util.Locale;


public class Atividade14do10 {

	public class LerArquivoScanner {
    		public static void main(String[] args) {
        		File arquivo = new File("input.txt");

        		try (Scanner scanner = new Scanner(arquivo)) {
            			while (scanner.hasNextLine()) {
      	          			String linha = scanner.nextLine();
     	           			System.out.println(linha);
           			}
        		}	 
			catch (FileNotFoundException e) {
            			e.printStackTrace();
       			}
    		}
	}

	public static void ordenar(){

	}

	public static void main(string[] args){
		

	}

}

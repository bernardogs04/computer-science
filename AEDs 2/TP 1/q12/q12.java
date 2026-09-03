public class SomaDigitos {

    public static int calculo(int numero){ {
        if (numero == 0){ // caso o numero seja 0, é sinal que nao tem mais restou, entao nao precisa mais somar numero
            return 0;
        }
        return (numero % 10) + calculo(numero / 10); // faz a soma de cada elemento e chama a funcao novamente dividindo por 10, para analisar o proximo elemento
    }

    public static void main(String[] args) {
        java.util.Scanner entrada = new java.util.Scanner(System.in);

        for (int i = 0; i < 50; i++) { //pub.in tem 50 numeros, logo for rodando até 50
            int numero = entrada.nextInt(); // leitura do numero
            int resposta = calculo(numero); // chamada da funcao para fazer o calculo dos elementos
            System.out.println(resposta); // printar a soma dos elementos
        }

        entrada.close();
        }
    }
}

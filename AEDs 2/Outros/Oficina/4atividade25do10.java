import java.util.Scanner;

class No {
    public int valor;
    public No esq;
    public No dir;

    public No(int valor) {
        this.valor = valor;
        this.esq = null;
        this.dir = null;
    }
}

class ArvoreBinaria {
    private No raiz;
    private boolean primeiro;

    public ArvoreBinaria() {
        raiz = null;
    }

    public void inserir(int x) {
        raiz = inserirNo(raiz, x);
    }

    private No inserirNo(No atual, int x) {
        if (atual == null) {
            atual = new No(x);
        } else if (x < atual.valor) {
            atual.esq = inserirNo(atual.esq, x);
        } else if (x > atual.valor) {
            atual.dir = inserirNo(atual.dir, x);
        }

        return atual;
    }

    public boolean pesquisar(int x) {
        No atual = raiz;
        boolean achou = false;

        while (atual != null && !achou) {
            System.out.print(atual.valor + " ");

            if (x == atual.valor) {
                achou = true;
            } else if (x < atual.valor) {
                atual = atual.esq;
            } else {
                atual = atual.dir;
            }
        }

        return achou;
    }

    private void mostrar(int valor) {
        if (primeiro) {
            System.out.print(valor);
            primeiro = false;
        } else {
            System.out.print(" " + valor);
        }
    }

    public void caminharPre() {
        if (raiz == null) {
            System.out.println("V");
        } else {
            primeiro = true;
            pre(raiz);
            System.out.println();
        }
    }

    private void pre(No atual) {
        if (atual != null) {
            mostrar(atual.valor);
            pre(atual.esq);
            pre(atual.dir);
        }
    }

    public void caminharPos() {
        if (raiz == null) {
            System.out.println("V");
        } else {
            primeiro = true;
            pos(raiz);
            System.out.println();
        }
    }

    private void pos(No atual) {
        if (atual != null) {
            pos(atual.esq);
            pos(atual.dir);
            mostrar(atual.valor);
        }
    }

    public void caminharEm() {
        if (raiz == null) {
            System.out.println("V");
        } else {
            primeiro = true;
            em(raiz);
            System.out.println();
        }
    }

    private void em(No atual) {
        if (atual != null) {
            em(atual.esq);
            mostrar(atual.valor);
            em(atual.dir);
        }
    }
}

class LabArvoreBinaria {
    public static void main(String[] args) {
        Scanner entrada = new Scanner(System.in);
        ArvoreBinaria arvore = new ArvoreBinaria();
        String operacao;
        int x;

        while (entrada.hasNext()) {
            operacao = entrada.next();

            if (operacao.equals("I")) {
                x = entrada.nextInt();
                arvore.inserir(x);
            } else if (operacao.equals("P")) {
                x = entrada.nextInt();

                if (arvore.pesquisar(x)) {
                    System.out.println("S");
                } else {
                    System.out.println("N");
                }
            } else if (operacao.equals("PRE")) {
                arvore.caminharPre();
            } else if (operacao.equals("POS")) {
                arvore.caminharPos();
            } else if (operacao.equals("EM")) {
                arvore.caminharEm();
            }
        }

        entrada.close();
    }
}

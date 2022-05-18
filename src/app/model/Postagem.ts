import { Tema } from "./Tema";
import { Usuario } from "./Usuario";
import { Verificacao } from "./Verificacao";

export class Postagem{

  public id: number;
  public texto: string;
  public date: Date;
  public cep: string;
  public endereco: string;
  public complemento: string;
  public foto: string;
  public ufNome: string;
  public ufSigla: string;
  public urgencia: string;
  public tema: Tema;
  public usuario: Usuario;
  public verificacao: Verificacao;

}
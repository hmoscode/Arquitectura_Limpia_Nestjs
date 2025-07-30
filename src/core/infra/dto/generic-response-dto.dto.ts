export class GenericResponseDto {
  id?: number;
  message: string;
  statusCode: number;

  constructor(props: { id?: number; message?: string; statusCode?: number }) {
    this.id = props.id;
    this.message = props.message ?? 'Operación exitosa';
    this.statusCode = props.statusCode ?? 200;
  }
}

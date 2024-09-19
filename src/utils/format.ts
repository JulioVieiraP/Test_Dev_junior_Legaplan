export function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    };
  
    const formatter = new Intl.DateTimeFormat('pt-BR', options);
  
    return formatter.format(date);
}
  
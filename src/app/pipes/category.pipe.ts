import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../interfaces/article';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(allArticles: Article[], category: string): Article[] {
    if (category != "All")
      return allArticles.filter(article => (article.category === category));
    else
      return allArticles;
  }


}

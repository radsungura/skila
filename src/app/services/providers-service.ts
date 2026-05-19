import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {
  allprov: any;
  prov: any;
  providers: any = {};
     private api = 'http://localhost:3000/providers';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  create(doc: any): Observable<any> {
    return this.http.post<any>(this.api, doc);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  update(id: number, doc: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, doc);
  }

  // Simuler une recherche dans une API
  searchprovider(query: string): Observable<any[]> {
    // Simuler un filtrage basé sur le nom du médicament
    const results = this.providers.filter((prov: any) => prov.name.toLowerCase().includes(query.toLowerCase()));
    return of(results); // Retourner un Observable
  }

  byPharma(query: string): Observable<any[]> {
    // Simuler un filtrage basé sur le nom du médicament
    const results = this.providers.filter((prov: any) => prov.pharma.toLowerCase().includes(query.toLowerCase()));
    return of(results); // Retourner un Observable
  }

  getSingle(item: string) {
    const data = this.providers.find((el: any) => el.code === item);
    if (data) {
      return data;
    } else {
      return {};
    }
  }
  getFavorite(item: string) {
    const data: any = localStorage.getItem('provfav');
    let fav: any;
    if (data) {
      fav = JSON.parse(data).filter((el: any) => el.user === item );
      return fav;
    } else {
      fav = {};
    }
    return fav;
  }
  addFavorite(item: any) {
    let favoris: any = [];
    const res = this.getFavorite(item.user)
      const data: any = res;
      // return
      if (data) {
        favoris = data;
        favoris.push(item);
      }
      else {
        favoris.push(item);
      }
      try {
        localStorage.setItem('provfav', JSON.stringify(favoris));
      }
      catch (error) {
        console.log("provError", error);
      }
  }

  deleteFavorite(item: any) {
    let favoris: any = [];
    let res = this.getFavorite(item.user);
    if (res) {
      const seted = res.filter((el: any) => el.Id !== item.Id);
        localStorage.setItem('provfav', JSON.stringify(seted));
      alert("Saved successfully !");
      favoris = seted;
    } 
    return favoris;
  }

  Delete(item: any) {
      // delete in localstorage
    const res = this.getprov();
    if (res) {
      const data = res.filter((el: any) => el.code !== item.code);
      localStorage.setItem("provProd", JSON.stringify(data));
      return true;
    } else {
      return false;
    }
    
  }

  Update(item: any) {
    const res = this.getprov();
    if (res) {
      const data = res.findIndex((el: any) => el.code === item.code);
      res[data] = item;
      localStorage.setItem("provProd", JSON.stringify(res));
      return true;
    } else {
      return false;
    }
  }

  Create(item: any) {
      // localstorage
    let favoris: any = [];
    const data = this.getAll()
    if (data) {
      favoris = data;
      favoris.push(item);
    }
    else {
      favoris.push(item);
    }
    try {
      localStorage.setItem('provProd', JSON.stringify(favoris));
      return true;
    }
    catch (error) {
      console.log("provError", error);
      return false;
    }
  }

  getprov() {
    const res = localStorage.getItem('provProd');
    const data = res? JSON.parse(res): false;
    return data;
  }
}
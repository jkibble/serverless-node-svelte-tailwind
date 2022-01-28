import { onMount } from "svelte";
import { writable } from "svelte/store";

class Router {
  routeList: any = [];
  selectedRoute: object = {};
  _store = writable(this); // allows subscribing to router changes

  addRoutes(routes: any): void {
    this.routeList = [...this.routeList, ...routes];
    this._store.set(this);
  }
  
  addRoute(route: any): void {
    this.routeList.push(route);
    this._store.set(this);
  }

  subscribe(callback: any): object {
    return this._store.subscribe(callback);
  }

  start(): void {
    if (window.location.hash) {
      const route = window.location.hash.substring(1);
      this.changeRoute(route);
    }

    this.mount(this.routeList);
  }

  mount(routes): void {
    onMount(() => {
      routes.forEach((href) => {
        const link = document.querySelector(`a[href="#${href.route}"]`);

        if (link) {
          link.addEventListener("click", (e) => {
            e.preventDefault();
            this.changeRoute(href.route);
          });
        }
      });
    });
  }

  changeRoute(route): void {
    window.history.pushState({}, `${route}`, `/nine#${route}`);
    this.selectedRoute = this.routeList.find((r) => r.route === route);
    this._store.set(this);
  }
}

export default new Router;
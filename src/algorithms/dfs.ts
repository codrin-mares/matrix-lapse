import util from 'util';

class Graph {
  adjacencyList: { [vertex: string]: string[] } = {};

  addVertex(vertex: string) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }

    return this;
  }

  addEdge(source: string, destination: string) {
    if (!this.adjacencyList[source]) {
      this.addVertex(source);
    }
    if (!this.adjacencyList[destination]) {
      this.addVertex(destination);
    }
    this.adjacencyList[source].push(destination);
    this.adjacencyList[destination].push(source);

    return this;
  }

  removeEdge(source: string, destination: string) {
    this.adjacencyList[source] = this.adjacencyList[source].filter((vertex) => vertex !== destination);
    this.adjacencyList[destination] = this.adjacencyList[destination].filter((vertex) => vertex !== source);

    return this;
  }

  removeVertex(vertex: string) {
    while (this.adjacencyList[vertex].length) {
      const adjacentVertex = this.adjacencyList[vertex].pop();
      adjacentVertex && this.removeEdge(vertex, adjacentVertex);
    }

    delete this.adjacencyList[vertex];

    return this;
  }
  bfs(start: string) {
    const queue = [start];
    const result = [];
    const visited: { [vertex: string]: boolean } = {
      [start]: true,
    };

    while (queue.length) {
      const current = queue.shift() || '';

      result.push(current);

      for (const neighbour of this.adjacencyList[current] || []) {
        if (!visited[neighbour]) {
          visited[neighbour] = true;
          queue.push(neighbour);
        }
      }
    }

    return result;
  }

  dfs(start: string) {
    const stack = [start];
    const visited: { [v: string]: boolean } = {
      [start]: true,
    };
    const result = [];

    while (stack.length) {
      const current = stack.pop() || '';

      result.push(current);

      for (const next of this.adjacencyList[current] || []) {
        if (!visited[next]) {
          stack.push(next);
          visited[next] = true;
        }
      }
    }

    return result;
  }

  dfsRecursive(start: string) {
    const visited: { [v: string]: boolean } = {};
    const result: string[] = [];
    const adjacencyList = this.adjacencyList;

    (function dfsAlg(node: string) {
      if (!node) {
        return null;
      }

      visited[node] = true;

      result.push(node);

      adjacencyList[node].forEach((next) => {
        if (!visited[next]) {
          return dfsAlg(next);
        }
      });
    })(start);

    return result;
  }
}

const g = new Graph();

g.addEdge('1', '2')
  .addEdge('1', '4')
  .addEdge('2', '3')
  .addEdge('4', '3')
  .addEdge('3', '5')
  .addEdge('5', '6')
  .addEdge('5', '7');

console.log(util.inspect(g, { showHidden: false, depth: null, colors: true }));

console.log('BFS', util.inspect(g.bfs('1'), { showHidden: false, depth: null, colors: true }));
console.log('DFS', util.inspect(g.dfs('1'), { showHidden: false, depth: null, colors: true }));
console.log('DFS RECURSIVE', util.inspect(g.dfsRecursive('1'), { showHidden: false, depth: null, colors: true }));

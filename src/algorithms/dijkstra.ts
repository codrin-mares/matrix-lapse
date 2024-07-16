/*

  List of nodes with edges
  Visited nodes
  Adjacent nodes

  Nodes + Shortest Path + Previous Node

  1. Dijkstra
  1.1 Dijkstra on Matrix

  2. DFS
  3. BFS

  4. A Star

*/

import util from 'util';

type GraphEdge = {
  neighbour: string;
  weight: number;
};

type GraphNodes = Map<string, GraphEdge[]>;

type NodesMetadata = Map<
  string,
  {
    shortestDistance: number;
    previousNode: string | null;
  }
>;

class Graph {
  nodes: GraphNodes = new Map();

  enqueue(nodeName: string, edges: GraphEdge[]) {
    this.nodes.set(nodeName, edges);
  }

  getNodeEdges(nodeName: string | undefined): GraphEdge[] {
    if (!nodeName) {
      console.log(`Cannot find node: ${nodeName}.`);

      return [];
    }

    const edges = this.nodes.get(nodeName);

    if (!edges) {
      console.log(`Cannot find any edges for node: ${nodeName}.`);

      return [];
    }

    return edges;
  }

  getShortestDistances(startNode: string): NodesMetadata {
    const visitedNodes: { [node: string]: true } = {};
    let nextInLineNodes: string[] = [startNode];

    const nodesMetadata: NodesMetadata = new Map(
      [...this.nodes.keys()]
        .sort((a, b) => a.localeCompare(b))
        .map((node) => [
          node,
          {
            shortestDistance: node === startNode ? 0 : Infinity,
            previousNode: null,
          },
        ]),
    );

    if (!this.nodes.get(startNode)) {
      throw Error(`Invalid start node = ${startNode}`);
    }

    let currentNode: string;

    do {
      console.log('nextInLineNodes', nextInLineNodes);
      currentNode = nextInLineNodes.shift() || '';
      console.log('CURRENT NODE', currentNode);

      const edges = this.getNodeEdges(currentNode).sort((a, b) => a.weight - b.weight);
      const currentNodeShortestPath = nodesMetadata.get(currentNode)?.shortestDistance || 0;

      for (const edge of edges) {
        const edgeNodeMetadata = nodesMetadata.get(edge.neighbour);

        if (edgeNodeMetadata && edgeNodeMetadata.shortestDistance > edge.weight + currentNodeShortestPath) {
          const newEdgeNodeMetadata = {
            shortestDistance: edge.weight + currentNodeShortestPath,
            previousNode: currentNode,
          };

          nodesMetadata.set(edge.neighbour, newEdgeNodeMetadata);
        }
      }

      visitedNodes[currentNode] = true;
      const nextInLineEdges = edges
        .map((edge) => edge.neighbour)
        .filter((node) => !visitedNodes[node] && node !== currentNode);
      // nextInLineNodes = nextInLineNodes.filter((node) => node !== currentNode);
      nextInLineNodes = [...nextInLineNodes, ...nextInLineEdges];
      nextInLineNodes = [...new Set(nextInLineNodes)];
    } while (nextInLineNodes.length);

    return nodesMetadata;
  }

  getShortestPath(startNode: string, endNode: string) {
    const nodesMetadata = this.getShortestDistances(startNode);

    console.log('NODES METADATA', nodesMetadata);

    let previousNode = nodesMetadata.get(endNode)?.previousNode;
    let path = endNode;

    while (previousNode) {
      path = `${previousNode}-${path}`;

      previousNode = nodesMetadata.get(previousNode)?.previousNode;
    }

    return path;
  }
}

// export const findShortestPath = () => {};

const graph = new Graph();

graph.enqueue('A', [
  {
    neighbour: 'B',
    weight: 2,
  },
  {
    neighbour: 'D',
    weight: 8,
  },
]);

graph.enqueue('B', [
  {
    neighbour: 'A',
    weight: 2,
  },
  {
    neighbour: 'D',
    weight: 5,
  },
  {
    neighbour: 'E',
    weight: 6,
  },
]);

graph.enqueue('D', [
  {
    neighbour: 'A',
    weight: 8,
  },
  {
    neighbour: 'B',
    weight: 5,
  },
  {
    neighbour: 'E',
    weight: 3,
  },
  {
    neighbour: 'F',
    weight: 2,
  },
]);

graph.enqueue('E', [
  {
    neighbour: 'B',
    weight: 6,
  },
  {
    neighbour: 'D',
    weight: 3,
  },
  {
    neighbour: 'F',
    weight: 1,
  },
  {
    neighbour: 'C',
    weight: 9,
  },
]);

graph.enqueue('F', [
  {
    neighbour: 'D',
    weight: 2,
  },
  {
    neighbour: 'E',
    weight: 1,
  },
  {
    neighbour: 'C',
    weight: 3,
  },
]);

graph.enqueue('C', [
  {
    neighbour: 'E',
    weight: 9,
  },
  {
    neighbour: 'F',
    weight: 3,
  },
]);

console.log(util.inspect(graph, { showHidden: false, depth: null, colors: true }));

// console.log('NODES METADATA', graph.getShortestDistances('C'));
console.log('NODES PATH', graph.getShortestPath('C', 'A'));

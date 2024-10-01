export interface AudioNodeItem {
    type: string;
    node: AudioNode | null;
    started?: boolean | false;
    previousNodeName?:string;
    nextNodeName?:string;
  }

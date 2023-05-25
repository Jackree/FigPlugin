
figma.showUI(__html__, { width: 400, height: 200, title: "Площадь. БАДЫ" });

interface Info {
  nodeWidth: any;
  nodeHeight: any;
  parentWidth: any;
  parentHeight: any;
  percent: any;
}

function showSelected(page: PageNode) {
  const info: Info = {
    nodeWidth: "",
    nodeHeight: "",
    parentWidth: "",
    parentHeight: "",
    percent: "",
  };

  const selectedNode = page.selection[0];

  if (selectedNode && selectedNode.width && selectedNode.height) {
    info.nodeWidth = selectedNode.width;
    info.nodeHeight = selectedNode.height;
  } else {
    return;
  }

  if (selectedNode.parent !== null) {
    if (selectedNode.parent.width && selectedNode.parent.height) {
      info.parentWidth = selectedNode.parent.width;
      info.parentHeight = selectedNode.parent.height;
      const percent = (selectedNode.width * selectedNode.height) / (selectedNode.parent.width * selectedNode.parent.height) * 100;
      info.percent = percent;
    } else {
      return;
    }
  }

  figma.ui.postMessage(info);
}

figma.on("selectionchange", () => {
  showSelected(figma.currentPage);
});

figma.on("documentchange", () => {
  showSelected(figma.currentPage);
});

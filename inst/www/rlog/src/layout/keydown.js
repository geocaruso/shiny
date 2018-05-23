import $ from "jquery";
import _ from "lodash";

import console from "../utils/console";

import updateGraph from "../updateGraph/updateGraph";
import rlog from "../rlog";

let onKeydown = function(e) {
  console.log("e: ", e);
  if (e.target.id && e.target.id === "search") {
    // is in search text box
    if (e.which === 27) {
      $(e.target).blur();
    } else {
      // if (e.which == 13) { // enter
      // }
    }
    return;
  }
  if (e.which === 39 || e.which === 32) {
    // space, right
    if (e.altKey) {
      if (e.shiftKey) {
        // option + shift + right
        if (updateGraph.nextQueueEmpty()) {
          return;
        }
        // if it can't go right, try a cycle
      }
      // option + right
      // return false if there is no more enter/exit empty marks
      if (updateGraph.nextEnterExitEmpty()) {
        return;
      }
      // if it cant go right, try a step
    } else if (e.shiftKey) {
      // shift + right
      updateGraph.nextTick();
      return;
    }
    if (rlog.curTick < rlog.getGraph.maxStep) {
      // right
      updateGraph.nextStep();
      return;
    }
  }
  if (e.which === 37) {
    // left
    if (e.altKey) {
      if (e.shiftKey) {
        // option + shift + left
        if (updateGraph.prevQueueEmpty()) {
          return;
        }
        // if can't go left, try cycle
      }
      // option + left
      if (updateGraph.prevEnterExitEmpty()) {
        return;
      }
      // if can't go left, try step
    } else if (e.shiftKey) {
      // shift + left
      updateGraph.prevTick();
      return;
    }
    if (rlog.curTick > 1) {
      // left
      updateGraph.prevStep();
      return;
    }
  }
  if (e.which === 35) {
    // end
    // Seek to end
    updateGraph.lastEnterExitEmpty();
    return;
  }
  if (e.which === 36) {
    // home
    // Seek to beginning
    updateGraph.firstEnterExitEmpty();
    return;
  }

  if (e.which === 27) {
    // esc

    // remove hover
    // remove sticky
    // remove filter
    if (rlog.getGraph.hasHoverData) {
      console.log("reset hover");
      updateGraph.hoverDataReset();
    } else if (rlog.getGraph.hasStickyDatas) {
      console.log("reset sticky");
      updateGraph.stickyDatasReset();
    } else if (rlog.getGraph.hasFilterDatas) {
      console.log("reset filter");
      // must be in filter... so exit filter
      $("#search").val("");
      updateGraph.searchRegexReset();
    }
    return;
  }
  if (e.which === 38) {
    // arrow up
    if (rlog.getGraph.hasFilterDatas) {
      console.log("add layer!");
    }
    return;
  }
  if (e.which === 40) {
    // arrow down
    if (rlog.getGraph.hasFilterDatas) {
      console.log("remove layer!");
    }
    return;
  }
  if (e.which === 83) {
    // s
    _.defer(function() {
      $("#search").focus();
    });
    e.stopPropagation();
    return;
  }
};

export default onKeydown;

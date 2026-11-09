import test from "node:test";
import assert from "node:assert/strict";
import { SCENE_PRESETS, CAMERA_PRESETS, layoutFor, isValidLayout, moveItem } from "../src/lib/experience/studio-scene.js";
import { initialBroadcastState, broadcastReducer, isOnAir } from "../src/lib/experience/broadcast-machine.js";
import { STORY_THEMES, addCard, moveCard, buildStoryboard } from "../src/lib/experience/atelier.js";

test("six unique camera views and scene templates remain available", () => {
 assert.equal(SCENE_PRESETS.length, 6);
 assert.equal(CAMERA_PRESETS.length, 6);
 assert.equal(new Set(SCENE_PRESETS.map(s=>s.id)).size,6);
 assert.equal(new Set(CAMERA_PRESETS.map(s=>s.id)).size,6);
 for (const scene of SCENE_PRESETS){
   const items=layoutFor(scene.id);
   assert.ok(items.some(i=>i.kind==="chair"),scene.id);
   assert.ok(items.some(i=>i.kind==="table"),scene.id);
   assert.ok(isValidLayout(items),scene.id+" must have safe starting geometry");
 }
});
test("large furniture moves are clamped to the stage without mutating the source", () => {
 const original=layoutFor("one-on-one");
 const shifted=moveItem(original,"chair-host",100000,100000);
 assert.equal(shifted.find(i=>i.id==="chair-host").x,250);
 assert.equal(shifted.find(i=>i.id==="chair-host").z,160);
 assert.ok(isValidLayout(shifted));
 assert.deepEqual(original,layoutFor("one-on-one"));
});
test("ON AIR requires a genuinely acknowledged, authorized transport", () => {
 let state=initialBroadcastState(false,false);
 state=broadcastReducer(state,{type:"start"});
 assert.equal(state.phase,"FAILED");
 assert.equal(isOnAir(state),false);
 let connected=initialBroadcastState(true,true);
 connected=broadcastReducer(connected,{type:"start"});
 assert.equal(isOnAir(connected),false);
 connected=broadcastReducer(connected,{type:"connect"});
 assert.equal(isOnAir(connected),false);
 connected=broadcastReducer(connected,{type:"acknowledged"});
 assert.equal(isOnAir(connected),true);
 connected=broadcastReducer(connected,{type:"stop"});
 assert.equal(isOnAir(connected),false);
});
test("story atelier preserves actual sequence changes", () => {
 const theme=STORY_THEMES[0];
 assert.ok(theme);
 const beats=theme.beats;
 assert.ok(beats.length>=2);
 let list=addCard([],beats[0].id,theme);
 list=addCard(list,beats[1].id,theme);
 assert.equal(list.length,2);
 const moved=moveCard(list,0,1);
 assert.deepEqual(moved,[list[1],list[0]]);
 const storyboard=buildStoryboard({themeId:theme.id, atmosphereId:"intimate",moodId:"gold",cards:moved,note:""});
 assert.equal(storyboard.length,2);
});

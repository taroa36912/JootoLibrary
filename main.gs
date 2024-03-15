'use strict';

/** JootoAPI連携ライブラリ
 * ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
 * Jootoとの連携アプリ作成に多く用いる関数のテンプレートライブラリ
 * 各関数の最初に
 * １．関数の説明
 * ２．引数
 * ３．戻り値
 * の３つを記載
 * 戻り値がjsonである場合、
 * {code:レスポンスコード, data:レスポンスボディ}
 * となっている
 * レスポンスボディについては、以下APIリファレンスリンクを参照
 * https://www.jooto.com/api/reference/request/#/
 * 
 * 上から、基本関数、例外関数、JootoAPI利用関数、Jootowebhook利用関数の順番に並んでいる
 * API利用関数は、JootoAPIに飛ばし、レスポンスをそのまま返す関
 * 任意項目をすべて入力しない場合、引数の最後に{}を追加すること
 * webhook利用関数は、webhook起動時によくやるアクションを行う(作成する)関数
 * webhookの引数は、対応するwebhook発火のeデータのjsonとする
 * つまり、
 * const params = JSON.parse(e.postData.getDataAsString());
 * とし、paramsを引数とする
 * 
 * また、以下にも関数名と概要を羅列する
 * 
 * 1. 基本関数
 * ・MakeGetOption(str)...JootoへGETリクエストを送る際のOptionを作成
 * ・MakePostParams(str, json)...JootoへPOSTリクエストを送る際のParamsを作成
 * ・
 * ・
 * 
 * 2. 例外関数
 * 
 * 
 * 3. JootoAPI利用関数
 * 
 * 4. Jootowebhook利用関数
 * 
 * 最後に、これから追加する予定の関数を羅列する
 * 
 * ・タスク名からタスクIDを取得する関数
 * ・
 * ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
 * @version 1.0.0
 * @license Jooto
 */

/**
 * ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
 * 1. 基本関数
 * ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
*/

/** 
 * GETリクエストのoptionを作る関数
 * @param {string} apiKey -  APIKey
 * @returns {json} -  option
*/
function makeGetOption(apiKey){
  const headers = {
    'X-Jooto-Api-Key': apiKey
  };
  let option = {
    'method': 'GET',
    'headers': headers,
    'muteHttpExceptions': true
  };
  return option;
}


/** POSTリクエストのparamsを作る関数
 * @param {string} apiKey -  APIkey
 * @param {json}  list -  リクエストボディリスト
 * @returns {json} -  params
*/
function makePOSTParams(apiKey, list){
  const headers = {
    'Content-Type': 'application/json',
    'X-Jooto-Api-Key': apiKey
  }
  let params = {
    method: 'POST',
    headers: headers,
    payload: JSON.stringify(list),
    muteHttpExceptions: true
  }
  return params;
}


/** Get or Postリクエストでresponseを取得し、json式に変換する関数
 * @param {string} apiUrl - APIのURL
 * @param {json} option_or_params -  GETならoption、POSTならparams
 * @returns {json} response -  codeにレスポンスコード、dataにレスポンスボディ
*/
function jsonRequest(apiUrl,option_or_params){
  const response = UrlFetchApp.fetch(apiUrl, option_or_params);
  Utilities.sleep(500);
  const responseCode = response.getResponseCode();
  const responseText = response.getContentText();
  const responseData = JSON.parse(responseText);
  return {
    "code" : responseCode,
    "data" : responseData
  };
}


/** slackの指定したチャンネル(webhookURL)にメッセージを投稿する
 * @param {string} text -  投稿するメッセージテキスト
 * @param {string} webhookURL -  webhookURL
 * @returns {json} -  codeにレスポンスコード, dataにレスポンスボディ(slackAPI参照)
 */
function slackPost(webhookURL, text){
  const list = {"text" : text};
  const params = {
    method: 'POST',
    "contentType": "application/json",
    payload: JSON.stringify(list),
    muteHttpExceptions: true
  }

  let response = jsonRequest(webhookURL, params);
  return response;
}

/**
 * ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
 * 基本関数ここまで
 * ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
*/

/**
 * ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
 * 2. 例外関数
 * ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
*/

/** プロジェクト名からプロジェクトIDを返す関数
 * @param {string} apikey -  APIkey
 * @param {string} boardName -  プロジェクト名
 * @returns {num} boardId -  プロジェクトID(正しく取得時),  -1 -  エラー時は-1を返す
*/
function getBoardId(apiKey, boardName){
  const options = makeGetOption(apiKey);
  const apiUrl = "https://api.jooto.com/v1/boards/?archived=false&per_page=200";
  const response = jsonRequest(apiUrl, options);
  const responseCode = response.code;
  const responseData = response.data;
  if(responseCode != 200)return -1;
  let boardId = 0;
  let count = 0;
  for(board of responseData.boards){ // プロジェクト一覧から、名前に一致するボードIDを取得する
    if(board.title === boardName){
      boardId = board.id;
      count++;
    }
  }
  if(count == 0){ // 取得できなかった場合はエラー
    console.error("No board found.");
    return -1;
  }else if(count > 1){ // 同じボード名があった場合もエラー
    console.error("More than 2 boards found.");
    return -1;
  }
  if(boardId == 0 || (!boardId)){ // その他エラー
    console.error("Error occured.");
    return -1;
  }
  return boardId;
}


/** リスト名からリストIDを返す関数
 * @param {string} apikey -  APIkey
 * @param {num} boardId -  リストを探すプロジェクトのID
 * @param {string} listName -  リスト名
 * @returns {num} listId -  プロジェクトID(正しく取得時),  -1 -  エラー時は-1を返す
*/
function getListId(apiKey, boardId, listName){
  const options = makeGetOption(apiKey);
  const apiUrl = "https://api.jooto.com/v1/boards/"+boardId+"/lists?archived=false&per_page=200";
  const response = jsonRequest(apiUrl, options);
  const responseCode = response.code;
  const responseData = response.data;
  if(responseCode != 200)return -1;
  let listId = 0;
  let count = 0;
  for(list of responseData.lists){ // リスト一覧から、名前に一致するリストIDを取得する
    if(list.name === listName){
      listId = list.id;
      count++;
    }
  }
  if(count == 0){ // 取得できなかった場合はエラー
    console.error("No list found.");
    return -1;
  }else if(count > 1){ // 同じリスト名があった場合もエラー
    console.error("More than 2 lists found.");
    return -1;
  }
  if(listId == 0 || (!listId)){ // その他エラー
    console.error("Error occured.");
    return -1;
  }
  return listId;
}

/** 与えられた文字列が、日付オブジェクトであるかを確認する関数
 * @param {string} str -  検証する文字列
 * @returns {boolean} -  正しい文字列であればtrue, 間違っていればfalseを返す
 */
function isValidDateFormat(str) {
  if (str.length < 10)return false;
  const first10Chars = str.substring(0, 10);
  const pattern = /^\d{4}-\d{2}-\d{2}$/;
  return pattern.test(first10Chars);
}


/**
 * ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
 * 例外関数ここまで
 * ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
*/

/**
 * ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
 * 3. JootoAPI利用関数
 * ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
*/

/** 組織のユーザー一覧を取得する関数
 * @param {string} apiKey -  APIKey
 * @param {json} additionalData -  タスク追加時の任意項目. {"description" : "説明"}のように指定する
 * 追加できる項目：page
 * @returns {json} response -  codeにレスポンスコード、dataにレスポンスボディ(ユーザー一覧取得)
 */
function getUsers(apiKey, additionalData){
  let apiUrl = '';
  if(additionalData.page){apiUrl = 'https://api.jooto.com/v1/users?per_page=200&page='+page;}else{'https://api.jooto.com/v1/users?per_page=200';}
  const option = makeGetOption(apiKey);
  const response = jsonRequest(apiUrl, option);
  return response;
}


/** 組織のプロジェクト一覧を取得する関数
 * @param {string} apiKey -  APIKey
 * @returns {json} response -  codeにレスポンスコード、dataにレスポンスボディ(プロジェクト一覧取得)
 */
function getProjects(apiKey){
  const apiUrl = 'https://api.jooto.com/v1/boards';
  const option = makeGetOption(apiKey);
  const response = jsonRequest(apiUrl, option);
  return response;
}


/** プロジェクトを作成する関数
 * @param {string} apiKey -  APIKey
 * @param {string} projectName -  プロジェクト名
 * @param {json} additionalData -  タスク追加時の任意項目. {"description" : "説明"}のように指定する
 * 追加できる項目：description{str}
 * @returns {json} response -  codeにレスポンスコード、dataにレスポンスボディ(プロジェクト新規作成)
 */
function addProject(apiKey, projectName, additionalData){
  const apiUrl = 'https://api.jooto.com/v1/boards';
  const list = {
    'title' : projectName
  }
  if(additionalData.description)list['description']=additionalData.description;
  const params = makePOSTParams(apiKey, list);
  const response = jsonRequest(apiUrl, params);
  return response;
}


/** 指定したプロジェクトにいるメンバーの一覧情報を取得する関数
 * @param {string} apiKey -  APIKey
 * @param {number} boardId -  取得するプロジェクトのID
 * @returns {json} response -  codeにレスポンスコード、dataにレスポンスボディ(メンバー一覧取得)
 */
function getMembers(apiKey, boardId){
  const apiUrl = 'https://api.jooto.com/v1/boards/' + boardId + '/users?per_page=200';
  const option = makeGetOption(apiKey);
  const response = jsonRequest(apiUrl, option);
  return response;
}


/** リスト一覧を取得する関数
 * @param {string} apiKey -  APIKey
 * @param {number} boardId -  リスト一覧を取得するプロジェクトのID
 */
function getLists(apiKey, boardId){
  const apiUrl = 'https://api.jooto.com/v1/boards'+boardId+'lists?archived=false&per_page=200';
  const option = makeGetOption(apiKey);
  const response = jsonRequest(apiUrl, option);
  return response;
}


/** リストを作成する関数
 * @param {string} apiKey -  APIkey
 * @param {string} listName -  リスト名
 * @param {num} boardId -  リストを追加するプロジェクトのID
 * @param {string} color -   カラーコード(# + 6桁のnum)
 * @returns {json} response -  codeにレスポンスコード、dataにレスポンスボディ(リスト作成)
*/
function addList(apiKey, listName, boardId, color){
  let apiUrl = 'https://api.jooto.com/v1/boards/' + boardId + '/lists';
  let list = {
    "name" : listName,
    "color" : color,
    "is_done_list" : false
  }
  let params = makePOSTParams(apiKey, list);
  const response = jsonRequest(apiUrl, params);
  return response;
}


/**指定したプロジェクト内のタスク一覧を取得する関数
 * @param {string} apiKey -  APIKey
 * @param {number} boardId -  タスク一覧を取得するプロジェクトのID
 * @param {json} additionalData -  タスク追加時の任意項目. {"description" : "説明"}のように指定する
 * 指定できる項目：page(string)
 * @returns {json} response -  codeにレスポンスコード、dataにレスポンスボディ(タスク一覧取得)
*/
function getTask(apiKey, boardId, additionalData){
  let apiUrl = '';
  if(additionalData.page){
    apiUrl = 'https://api.jooto.com/v1/users?per_page=200&page='+page;
  }else{
    apiUrl = 'https://api.jooto.com/v1/users?per_page=200';
  }
  const options = makeGetOption(apiKey);
  const response = jsonRequest(apiUrl, options);
  return response;
}


/** 指定したタスクの情報を取得する関数
 * @param {string} apiKey -  APIKey
 * @param {number} boardId -  情報を取得するタスクがあるプロジェクトのID
 * @param {number} taskId -  情報を取得するタスクのID
 * @returns {json} response -  codeにレスポンスコード、dataにレスポンスボディ
 */
const getTaskInfo = function(apiKey, boardId, taskId){
  const apiUrl = 'https://api.jooto.com/v1/boards/' + boardId + '/tasks/' + taskId;
  const option = makeGetOption(apiKey);
  const response = jsonRequest(apiUrl, option);
  return response;
}


/** 指定したリストにタスクを移動する関数
 * @param {string} apiKey -  APIKey
 * @param {num} boardId -  移動先プロジェクトのID
 * @param {num} listId -  移動先リストのID
 * @param {num} taskId -  移動するタスクのID
 * @returns {json} response -  codeにレスポンスコード、dataにレスポンスボディ(タスク移動)
*/
function moveTask(apiKey, boardId, listId, taskId){
  const list = {
    "board_id" : boardId,
    "list_id" : listId
  };
  const apiUrl = "https://api.jooto.com/v1/tasks/"+taskId+"/move";
  const params = makePOSTParams(apiKey, list);
  const response = jsonRequest(apiUrl, params);
  return response;
}

/** 指定したリストにタスクを作成する関数
 * @param {string} apiKey -  APIKey
 * @param {num} boardId -  タスクを作成するプロジェクトのID
 * @param {num} listId -  タスクを作成するリストのID
 * @param {string} taskName -  作成するタスクの名前
 * @param {string} description -  作成するタスクの概要(指定しない場合、)
 * @param {num[]} assignedUserIds -  担当者に指定するユーザーのIDのリスト
 * @param {string} startDateTime -  開始日時
 * @param {string} deadlineDateTime -  終了日時
 * @param {num[]} categoryIds -  ラベルIDのリスト
 * @param {json} additionalData -  タスク追加時の任意項目. {"description" : "説明"}のように指定する
 * 追加できる項目： description{str}, assined_user_ids{number[]}, category_ids(number[]), start_date_time, deadline_date_time
 * @returns {json} response -  codeにレスポンスコード、dataにレスポンスボディ(タスク作成)
*/
function addTask(apiKey, boardId, listId, taskName, additionalData){
  const apiUrl = 'https://api.jooto.com/v1/boards/' + boardId + '/tasks';
  const list = {
    "name": taskName,
    "list_id": listId
  }
  if(additionalData.description)list["description"]=additionalData.description;
  if(additionalData.assigned_user_ids)list["assigned_user_ids"]=additionalData.assigned_user_ids;
  if(additionalData.category_ids)list["category_ids"]=additionalData.category_ids;
  if(additionalData.start_date_time && additionalData.deadline_date_time){
    let startDateTime = additionalData.start_date_time;
    let deadlineDateTime = additionalData.deadline_date_time;
    if(isValidDateFormat(startDateTime) && isValidDateFormat(deadlineDateTime)){
      list["start_date_time"] = startDateTime;
      list["deadline_date_time"] = deadlineDateTime;
    }
  }
  const params = makePOSTParams(apiKey, list);
  const response = UrlFetchApp.fetch(apiUrl, params);
  return response;
}


/** 指定したプロジェクトのラベル一覧を取得する関数
 * @param {string} apiKey -  APIKey
 * @param {number} boardId -  ラベル一覧を取得するプロジェクトのID
 * @returns {json} response -  codeにレスポンスコード、dataにレスポンスボディ(ラベル一覧取得)
 */
function getCategories(apiKey, boardId){
  const apiUrl = 'https://api.jooto.com/v1/boards/'+boardId+'categories?per_page=200';
  const option = makeGetOption(apiKey);
  const response = jsonRequest(apiUrl, option);
  return response;
}



/** 指定したタスクのチェックリスト一覧を取得する関数
 * @param {string} apiKey -  APIKey
 * @param {number} taskId -  アイテム一覧を取得するチェックリストのID
 * @returns {json} response -  codeにレスポンスコード、dataにレスポンスボディ
 */


const getChecklists = function(apiKey,taskId){
  const apiUrl = 'https://api.jooto.com/v1/tasks/'+taskId+'/checklists?per_page=200';
  const option = makeGetOption(apiKey);
  const response = jsonRequest(apiUrl, option);
  return response;
}


/** チェックリストを追加する関数
 * @param {string} apiKey -  APIKey
 * @param {number} taskId -  チェックリストを追加するタスクのID
 * @param {string} checklistName -  チェックリスト名
 * @returns {json} response -  codeにレスポンスコード、dataにレスポンスボディ(チェックリスト新規追加)
 */
const createJootoCheckList_ = function(apiKey, taskId, checklistName){
  const apiUrl = 'https://api.jooto.com/v1/tasks/'+taskId+'/checklists';
  const list ={
      "title": checklistName
    }

  const params = makePOSTParams(apiKey, list);
  const response = jsonRequest(apiUrl, params);
  return response;
}


/** 指定したチェックリストのアイテム一覧を取得する関数
 * @param {string} apiKey -  APIKey
 * @param {number} checklistId -  アイテム一覧を取得するチェックリストのID
 * @returns {json} response -  codeにレスポンスコード、dataにレスポンスボディ
 */
const getItems = function(apiKey,cheklistId){
  const apiUrl = 'https://api.jooto.com/v1/checklists/'+cheklistId+'/items?per_page=200';
  const option = makeGetOption(apiKey);
  const response = jsonRequest(apiUrl, option);
  return response;
}


/** 指定したチェックリストにアイテムを追加する関数
 * @param {string} apiKey -  APIkey
 * @param {number} checklistId -  アイテムを追加するチェックリストのID
 * @param {string} itemName -  アイテム名
 * @param {json} additionalData -  タスク追加時の任意項目. {"description" : "説明"}のように指定する
 * 追加できる項目：assined_user_ids{number[]}, start_date_time, deadline_date_time
 * @returns {json} response -  codeにレスポンスコード、dataにレスポンスボディ(アイテム追加)
 */
const addItem = function(apiKey, checkListId, itemName, additionalData){
  const apiUrl = 'https://api.jooto.com/v1/checklists/'+checkListId+'/items';
  const list = {
    "content" : itemName
  };
  if(additionalData.assigned_user_ids)list["assigned_user_ids"]=additionalData.assigned_user_ids;
  if(additionalData.start_date_time && additionalData.deadline_date_time){
    let startDateTime = additionalData.start_date_time;
    let deadlineDateTime = additionalData.deadline_date_time;
    if(isValidDateFormat(startDateTime) && isValidDateFormat(deadlineDateTime)){
      list["start_date_time"] = startDateTime;
      list["deadline_date_time"] = deadlineDateTime;
    }
  }
  const params = makeGetOption(apiKey, list);
  const response = jsonRequest(apiUrl, params);
  return response;
}


/**
 * ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
 * JootoAPI利用関数ここまで
 * ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
*/

/**
 * ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
 * Jootowebhook利用関数
 * ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
*/


/** Jootoでメンション付きコメントのwebhookが起動したとき、様々なチャット媒体に送るテキストとして成型できる関数
 * @param {json} params -  メンション付きコメントのwebhookJson
 * @returns {string} text -  成型したテキスト 
 */
function makeSendtext(params){
  if(params.data.action_type != "mention_in_comment")return "";
  let senderName = params.sender.full_name;
  let mentionedNames = [];
  if(params.data.mentioned_users){
    for (let mentionedUser of params.data.mentioned_users){
      mentionedNames.push(mentionedUser.full_name);
    }
  }
  let names = "";
  for(let i=0; i < mentionedNames.length; i++){
    names = names + mentionedNames[i] + ", ";
  }
  let taskId = params.data.task_id;
  let boardId = params.data.board_id;
  let taskURL = "https://app.jooto.com/boards#" + boardId + "?task_id=" + taskId;
  let comment = params.data.comment;
  let i=0;
  comment =  comment.replace(/@[^ \n]*/g, function(match) {
    return "@" + mentionedNames[i++];
  });
  
  let text = `${senderName}さんが, ${names}さんに, ${params.data.board_name}ボードの${params.data.list_name}リストのタスクのコメントでメンションしました。
タスク：${params.data.task_name}(${params.data.task_number})

${taskURL}

${comment}`;
  return text;
}










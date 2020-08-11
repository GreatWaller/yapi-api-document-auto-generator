const json2md = require("json2md");
const fs = require("fs");

// const json = [
//   { "h1": "JSON To Markdown" }
//   , { "blockquote": "A JSON to Markdown converter." }
//   , {
//     "img": [
//       { title: "Some image", source: "https://example.com/some-image.png" }
//       , { title: "Another image", source: "https://example.com/some-image1.png" }
//       , { title: "Yet another image", source: "https://example.com/some-image2.png" }
//     ]
//   }
//   , { h2: "Features" }
//   , {
//     ul: [
//       "Easy to use"
//       , "You can programmatically generate Markdown content"
//       , "..."
//     ]
//   }
//   , { h2: "How to contribute" }
//   , {
//     ol: [
//       "Fork the project"
//       , "Create your branch"
//       , "Raise a pull request"
//     ]
//   }
//   , { h2: "Code blocks" }
//   , { p: "Below you can see a code block example." }
//   , {
//     "code": {
//       language: "js"
//       , content: [
//         "function sum (a, b) {"
//         , "   return a + b"
//         , "}"
//         , "sum(1, 2)"
//       ]
//     }
//   }
//   , { table: { headers: ["a", "b"], rows: [{ a: "col1", b: "col2" }, { a: "col1", b: "col2" }] } }
// ]

// console.log(json2md(json))
console.log("======================");
console.log("read swaggerApi.json");

// function readJson(fileName) {
//   fs.readFile(fileName, function (err, data) {
//     if (err) {
//       console.error(err);
//     }
//     return JSON.parse(data);
//   })
// }

const j = () => fs.readFileSync('./swaggerApi.json', { endoding: 'utf8' });
let apiJson = JSON.parse(j())
// console.log(apiJson);
// console.log(JSON.stringify(apiJson,null,4));

let result = [];
let header = [
  // {h1:"澎思云接入说明"},
  // {h1:"一、接入指引"},
  // {h3:"1、平台概述"},
  // {p:"SenseLink开放平台（SenseLink Open Platform）是基于SenseLink云平台的开放服务平台。第三方系统接入SenseLink开放平台后，可以获取设备、人员、记录等接口能力，快速集成SenseLink人脸识别能力及多场景服务。目前SenseLink开放平台仅支持后台服务器（server类型）应用系统接入，更多应用类型将于后续逐步开放支持，敬请期待。"},
  // {h3:"2、版本号及更新时间"},
  // {p:"v1.0.0"},
  // {h3:"申请接入"},
  // {p:"开始申请之前，请您先联系商务支持（），咨询SenseLink开放平台的具体产品服务内容及定价，以确认是否能满足您的业务期望，否则可能会影响您的申请审核结果。"},
  // {h1:"二、调用规则"},
  // {p:""},
  // {h1:"三、错误码"},
  // {p:""},
  // {h1:"四、调用示例"},
  // {p:""},
  { h1: "五、通行功能模块相关API" }
];
for (const key in header) {
  if (header.hasOwnProperty(key)) {
    const element = header[key];
    result.push(element);
  }
}

json2md.converters.b=function (input, json2md) {
  return "**"+input+"**";
}

let categories = {};

const pathTemplate = {
  title: { h3: "api标题" },
  descriptionTitle: { b: "1、功能描述" },
  description: { p: "" },
  pathTitle: { b: "2、请求地址示例" },
  path: { p: "" },
  methodTitle: { b: "3、请求方式" },
  method: { p: "" },
  parameterTitle: { b: "4、请求参数" },
  //path param
  pathParamTitle:{p:""},
  pathParameters:{table:{}},
  queryOrBodyTitle:{p:""},
  parameters: { table: {} },
  authParameterTitle:{b:"5、鉴权参数"},
  authParameters:{table:{
    headers: ["name", "required", "type", "description"],
    rows: [{"name":"Authorization","required":"是","type":"Bearer Token","description":"服务接口需要先登录获取token"}]
  }},
  authException:{p:"例：eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6ImIyM2QyYmZjLTVmMWMtYWFlZC04YzNkLTM5ZjU0OTQxMmY4OCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwic3ViIjoiMSIsImp0aSI6IjY0MmY0ODc1LWQ0YTAtNDQ3Zi1iNzgwLTQzMDYxMzIwOTU5NSIsImlhdCI6MTU5Mjg3OTk5NiwidGVuYW50SWQiOiJudWxsIiwibmJmIjoxNTkyODc5OTk2LCJleHAiOjE1OTI5NjYzOTYsImlzcyI6Im5xdm9rdTlpR3BZYWEwYnJ0ZFJlSnJVZUF0eVVjSE8zIiwiYXVkIjoiQ2hhcm9uIn0.QJN4QAzjkz4MVy9_cdz3vggbcMkQjhLMEk9BYKnhNos"},
  standardResponseTitle:{b:"6、正常响应返回"},
  standardResponse:{p:""},
  responseTitle: { b: "7、返回字段说明" },
  responses: { table: {} },
  exceptionTitle:{b:"8、异常响应字段说明"},
  exception:{table:{}}
}
// "1、功能描述":"h3",
// "2、请求地址示例":"h3",
// "3、请求方式":"h3",
// "4、请求参数":"table",
// "5、鉴权参数":"table",
// "6、正常响应返回":"table",
// "7、返回字段说明":"table",
// "8、异常响应字段说明":"table"

let tags = apiJson["tags"];
tags.forEach(tag => {
  categories[tag["name"]] = [];
});


for (const key in apiJson["paths"]) {
  console.log(key);
  if (apiJson["paths"].hasOwnProperty(key)) {
    const body = apiJson["paths"][key];
    // console.log(apiJson["paths"][key]);
    let pathBody = {};
    pathBody["path"] = key;
    // 1 tag & summary
    // 2 method:path后的第一个key
    // 3 parameters: （TODO:取第一个元素中 in 的值作为 参数来源）
    // 4 responses:schema:properties
    for (const method in body) {
      if (body.hasOwnProperty(method)) {
        const element = body[method];
        let tag = element["tags"][0];
        let summary = element["summary"];
        let description = element.hasOwnProperty("description")?element["description"]:"";
        pathBody["tag"] = tag;
        pathBody["method"] = method;
        pathBody["summary"] = summary;
        pathBody["description"] = description;

        let parameters = {
          table: {
            headers: ["name", "required", "type", "description"],
            rows: []
          }
        };

        let pathTable={
          table: {
            headers: ["name", "required", "type", "description"],
            rows: []
          }
        }

        let parameterTable = parameters["table"];
        let pathParameterTabel=pathTable["table"];
        //参数在get和post时不同
        if (method.toLowerCase() === "get") {
          element["parameters"].forEach(parameter => {
            let row = {};
            parameterTable["headers"].forEach(header => {
              if (header === "required") {
                row[header] = parameter[header] ? "是" : "否";
              } else {
                row[header] = parameter.hasOwnProperty(header) ? parameter[header] : "";
              }
            });
            parameterTable["rows"].push(row);
          });
        } else {
          
          if (element["parameters"].length<=0) {
            //TODO:
          }else{
            //path, query ,Body 三类参数
            let BodyParameters={};
            let pathParameters=[];
            let queryParameters=[];
            element["parameters"].forEach(p => {
              switch (p["in"]) {
                case "path":
                  //添加一个 path的table
                  pathParameters.push(p);
                  break;
                case "query":
                  queryParameters.push(p);
                  break;
                case "body":
                  BodyParameters=p["schema"]["properties"];
                  break;
                default:
                  break;
              }
            });
            //path
            if (pathParameters.length>0) {
              pathParameters.forEach(pathParam => {
                let row = makeRow(pathParam);
                pathParameterTabel.rows.push(row);
              });
            }
            //query
            
            //body
            for (const key in BodyParameters) {
              if (BodyParameters.hasOwnProperty(key)) {
                const e = BodyParameters[key];
                let row=makeRow(e);
                row['name']=key;
                parameterTable["rows"].push(row);
              }
            }
          }
        }
        if (pathTable.table.rows.length>0) {
          pathBody["pathParameters"]=pathTable;
          pathBody["pathParamTitle"]="路径参数";
        }else{
          pathBody["pathParameters"]={table:{}};
          pathBody["pathParamTitle"]="";
        }
        
        pathBody["parameters"] = parameters.table.rows.length>0?parameters:{table:{}};

        let responses = propertyTable(element["responses"][200]["schema"]["properties"]);
        pathBody["responses"] = responses.table.rows.length>0? responses:{table:{}};
      }
    }

    categories[pathBody["tag"]].push(pathBody);
  }
}

for (const category in categories) {
  if (categories.hasOwnProperty(category)) {
    const categoryList = categories[category];
    let categoryTitle = {
      h2: category
    }
    result.push(categoryTitle);
    categoryList.forEach(path => {
      let pathMd = JSON.parse(JSON.stringify(pathTemplate))
      for (const key in pathMd["title"]) {
        if (pathMd["title"].hasOwnProperty(key)) {
          pathMd["title"][key] = path["summary"];
        }
      }
      pathMd["standardResponse"]["p"]=path["description"];
      pathMd["description"]["p"] = path["summary"];
      pathMd["path"]["p"] = path["path"];
      pathMd["method"]["p"] = path["method"];
      if (path["method"].toLowerCase()=== "get") {
        pathMd["queryOrBodyTitle"]="Query:"
      } else {
        pathMd["queryOrBodyTitle"]="Body:"
        
      }
      pathMd["pathParamTitle"]=path["pathParamTitle"];
      pathMd.pathParameters=path.pathParameters;
      pathMd["parameters"] = path["parameters"];
      pathMd["responses"] = path["responses"]
      for (const key in pathMd) {
        if (pathMd.hasOwnProperty(key)) {
          const element = pathMd[key];
          result.push(element);
        }
      }
    });
  }
}


function makeRow(pathParam) {
  let row = {};
  row["name"] = pathParam.hasOwnProperty("name")?pathParam["name"]:"";
  row["required"] = pathParam["required"] ? "是" : "否";
  row["description"] = pathParam.hasOwnProperty("description") ? pathParam["description"] : "";
  if (pathParam["type"].toLowerCase() === "array") {
    row["type"] = pathParam["items"]["type"] + " []";
  }
  else {
    row["type"] = pathParam.hasOwnProperty("type") ? pathParam["type"] : "";
  }
  return row;
}

function propertyTable(propertyDict) {
  let responses = {
    table: {
      headers: ["name", "type", "description"],
      rows: []
    }
  }
  let rows = responses["table"]["rows"];
  const headers = responses["table"]["headers"];
  traverseProperties(propertyDict, rows, headers,"");

  return responses;
}

function traverseProperties(properties, rows, headers,indent) {
  for (const propertyKey in properties) {
    if (properties.hasOwnProperty(propertyKey)) {
      const property = properties[propertyKey];
      let row = {};
      rows.push(row);
      headers.forEach(header => {
        if (header === "type" && property["type"] === "object") {
          indent += "&ensp;&ensp;--";
          row["type"] = property["type"];
          traverseProperties(property["properties"], rows, headers,indent);
          indent=indent.substring(14);
        } else if (header === "type" && property["type"] === "array") {
          indent += "&ensp;&ensp;--";
          row["type"] = property["type"];
          traverseProperties(property["items"]["properties"], rows, headers,indent);
          indent=indent.substring(14);
        } else if(header === "type" && Array.isArray(property["type"])){
          property["type"].forEach(type => {
            if (type !=="null") {
              row["type"]=type;
            }
          });
        }else if (header === "name") {
          row["name"] = indent+propertyKey;
        }
        else {
          row[header] = property.hasOwnProperty(header) ? property[header] : "";
        }
      });
    }
  }
  
}
// console.log(JSON.stringify(result));

console.log("===========================converting done!====================");
// console.log(json2md(result));
// fs.writeFileSync("api.md", json2md(result));
let reader=fs.createReadStream("header.md");
let wSoptions = {
  flags: "w+"
}
let writer=fs.createWriteStream("pensees-cloud-api.md",wSoptions);

reader.pipe(writer,{end:false});
reader.on("end", ()=>{
  fs.appendFileSync("pensees-cloud-api.md",json2md(result));
});

console.log("======================create file done=========================");






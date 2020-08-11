# 澎思云接入说明

# 一、接入指引

### 1、平台概述


澎思云（Pensees Cloud）智慧通行基于业界领先的人脸识别技术，澎思科技将新技术、新理念应用于传统安全通行领域，打造澎思智慧通行产品、智能终端搭载澎思云为现代通行相关各种服务场景带来了无限可能。

只需一个Pensees云企业账户，用户即可轻松将澎思智慧通行系智慧人脸门禁、智慧签到机、人证一体机等产品接入云端，获得人脸门禁、人脸考勤、人证比对、人脸迎宾、人脸签到等多场景一站式服务。

### 2、版本号及更新时间

| 版本 | 发布时间   | 更新概要 |
| ---- | ---------- | -------- |
| v1.0 | 2020.08.31 |          |
|      |            |          |



### 3、申请接入


开始申请之前，请您先联系商务支持（），咨询SenseLink开放平台的具体产品服务内容及定价，以确认是否能满足您的业务期望，否则可能会影响您的申请审核结果。

# 二、调用规则

#### 1、客户端获取授权码

服务端采用JWT身份验证方式，每次调用服务接口需要在Header中携带Token信息。

获取方式：

首先获取手机验证码，然后Post方式调用http://pescloud-dev.pensees-ai.com:32080/api/TokenAuth/AuthenticateWithSms

Body参数为

```json
{
    "phoneNumber": "19900001111",
    "password": "123456",
    "smsAuthCode": "111111",
    "rememberClient": true
}
```

返回

```json
{
    "result": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6ImIyM2QyYmZjLTVmMWMtYWFlZC04YzNkLTM5ZjU0OTQxMmY4OCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwic3ViIjoiMSIsImp0aSI6Ijg0ZWYwNjQ1LThlZDUtNDllMS1iNjI2LTIyMTUxYjY0ZjI1MCIsImlhdCI6MTU5NjQ0MDAzMSwidGVuYW50SWQiOiJudWxsIiwibmJmIjoxNTk2NDQwMDMxLCJleHAiOjE1OTY1MjY0MzEsImlzcyI6Im5xdm9rdTlpR3BZYWEwYnJ0ZFJlSnJVZUF0eVVjSE8zIiwiYXVkIjoiQ2hhcm9uIn0.rHTjOgTpt_j1C79meKrVXFnAWWVR9lnlmqcxqMM149E",
        "encryptedAccessToken": "wNYmO41/48SHNstaLVXxHCCre29BZQl1NhC6NM3R3rzpXtPQxVzH6jEzA/QhXFN5tu6Fk7pO53uppm1mVXMZgxbyRVz26dnepi/FyB6axBY+6gq1GL+uRQgoiFUCjRN2p8w6LevViwKlHyWZZJZO1DGVSjAi1m2U+og9pkHw9/QR4Nl/DPnoP9JYDMpZ1zxx09u6s0GZ9/Q5Sjk+L0UfcSCbl38X8he5w9UIn/Hvxh7ysM1CiPLsoOwtbiieSRVmrmt0JjnipAn4/K283F8GrGwzwgehWsqefmUnM0ckMwP9ZAdwQxWDhxv0IqNw4tDhwUYs/1SYdYozdNzgByhgNOBPzQDObNLlWc4vV5VMOiazLcQFb4dJ/XCmu0Iotrw5o7hbcX3CUa7spGOLwzzLfOFtNr0demqVw0Kxd8fT2Fo6KvPalTJoqgqm0P60UpvdqGKC4H/e2gJrTzhg+zI+beFCM3mPpFqk7TJEKL0HShe4N3zYAUnKnSUSofuQVoi44xqShvywai9s694yTOJw2qBZT+ngMwbbovSVj9YSOeUtWBZlRF9M5Z8y05rw/QzdAzORXjp4iFM+vn5k7Ply9RrA5YN6ve/dDR5r1X6nUVwTznbA2jVgYziwI5gO+bqvWXuiF1VrCYN2PtCUD6dJoIozjSpx9bMv8DRHD71zEhaHUOyFSNcLBHNIUfOd4ypcbwBSiS6J8ImAIzTwze+b6qk4mDG9+pwES6+juBbzQbAk6rKFzePTymACkq5w7ToZaBmkRV3TChW9bsU3qEwMzdOyc/U/aWlEMYDxPiIJf5qqXfxlKAj2OxbJ9iOwaYdpaHIdCEDkZ6wqSGzgwkiGJ7a6BCRca4tAmFZ0gxx3bIRp3WTFQAqIPNsOQ7w5eirvimRiYEsBIrjVRT2P1EhZkGLRLBibMFfix2mfClsaBltZLLZRjyXKQuvCVUJF+AbJ",
        "expireInSeconds": 86400,
        "userId": 1
    },
    "targetUrl": null,
    "success": true,
    "error": null,
    "unAuthorizedRequest": false,
    "__abp": true
}
```

#### 2、客户端调用时添加Authorization Header

以上获得的accessToken，后续调取服务接口时向Header中添加Authorization信息即可：

```bash
curl -X GET "http://pescloud-dev.pensees-ai.com:32080/terminal-tenant/tenant/statistics/device/online?t=1596505614946&type=1" -H "accept: text/plain" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6ImIyM2QyYmZjLTVmMWMtYWFlZC04YzNkLTM5ZjU0OTQxMmY4OCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwic3ViIjoiMSIsImp0aSI6Ijg0ZWYwNjQ1LThlZDUtNDllMS1iNjI2LTIyMTUxYjY0ZjI1MCIsImlhdCI6MTU5NjQ0MDAzMSwidGVuYW50SWQiOiJudWxsIiwibmJmIjoxNTk2NDQwMDMxLCJleHAiOjE1OTY1MjY0MzEsImlzcyI6Im5xdm9rdTlpR3BZYWEwYnJ0ZFJlSnJVZUF0eVVjSE8zIiwiYXVkIjoiQ2hhcm9uIn0.rHTjOgTpt_j1C79meKrVXFnAWWVR9lnlmqcxqMM149E"
```




# 三、错误码




# 四、调用示例

#### Java

```java
package ai.pensees;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

import com.alibaba.fastjson.JSONObject;

/**
 * Hello world!
 *
 */
public class App {
    private final static String authUrl = "http://pescloud-dev.pensees-ai.com:32080/api/TokenAuth/AuthenticateWithSms";
    private final static String api = "http://pescloud-dev.pensees-ai.com:32080/terminal-tenant/tenant/dept/list?t=1596677312441";

    public static void main(String[] args) {
        System.out.println("Hello World!");
        String result = "";

        JSONObject inpuObject = new JSONObject();
        inpuObject.put("phoneNumber", "19900001111");
        inpuObject.put("password", "123456");
        inpuObject.put("smsAuthCode", "111111");
        inpuObject.put("rememberClient", true);

        try {
            result = doPost(authUrl, inpuObject.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (result == null || result.isEmpty()) {
            return;
        }
        JSONObject resultObject = JSONObject.parseObject(result);
        String token = JSONObject.parseObject(resultObject.getString("result")).getString("accessToken");

        // 调用业务api时需在Header中设置Authorization
        try {
            String getResult = doGet(api, token);
            System.out.println(getResult);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public static String doPost(String strUrl, String params) throws Exception {
        return doPost(strUrl, params, "");
    }

    public static String doPost(String strUrl, String params, String token) throws Exception {
        BufferedReader in = null;
        String result = "";

        URL url = new URL(strUrl);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setDoInput(true);
        connection.setDoOutput(true);
        connection.setRequestMethod("POST");
        connection.setUseCaches(false);
        connection.setRequestProperty("Accept", "application/json,text/plain, */*");
        connection.setRequestProperty("Content-Type", "application/json;charset=UTF-8");

        if (params != null && !params.isEmpty()) {
            byte[] writeBytes = params.getBytes();
            connection.setRequestProperty("Content-Length", String.valueOf(writeBytes.length));
        }
        if (token != null && !token.isEmpty()) {
            connection.setRequestProperty("Authorization", token);
        }
        connection.connect();
        BufferedWriter out = new BufferedWriter(new OutputStreamWriter(connection.getOutputStream(), "utf-8"));

        out.write(params);
        out.flush();
        out.close();

        int code = connection.getResponseCode();
        try {
            if (code == 200) {
                InputStream inputStream = connection.getInputStream();
                in = new BufferedReader(new InputStreamReader(inputStream));
            } else {
                InputStream errorStream = connection.getErrorStream();
                in = new BufferedReader(new InputStreamReader(errorStream));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return result;
        }

        StringBuilder stringBuilder = new StringBuilder();
        String line;
        while ((line = in.readLine()) != null) {
            stringBuilder.append(line);
        }

        in.close();
        return stringBuilder.toString();
    }

    public static String doGet(String urlStr) throws Exception {
        return doGet(urlStr, "");
    }

    public static String doGet(String urlStr, String token) {
        String result="";
        BufferedReader reader = null;

        try {
            URL url = new URL(urlStr);

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            if (token != null && !token.isEmpty()) {
                connection.setRequestProperty("Authorization", token);
            }

            reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder stringBuilder = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                stringBuilder.append(line);
            }
            result = stringBuilder.toString();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }        
        return result;
    }
}

```



#### Go

```go
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

type resultBody struct {
	AccessToken          string `json:"accessToken"`
	EncryptedAccessToken string `json:"encryptedAccessToken"`
	ExpireInSeconds      int32  `json:"expireInSeconds"`
	UserID               int32  `json:"userId"`
}
type responseBody struct {
	Result              resultBody `json:"result"`
	TargetURL           string     `json:"targetUrl"`
	Success             bool       `json:"success"`
	Error               string     `json:"error"`
	UnAuthorizedRequest bool       `json:"unAuthorizedRequest"`
	Abp                 bool       `json:"__abp"`
}

func main() {
	authURL := "http://pescloud-dev.pensees-ai.com:32080/api/TokenAuth/AuthenticateWithSms"
	api := "http://pescloud-dev.pensees-ai.com:32080/terminal-tenant/tenant/dept/list?t=1596677312441"

	mapP := make(map[string]interface{}, 4)
	mapP["phoneNumber"] = "19962021565"
	mapP["password"] = "123qwe"
	mapP["smsAuthCode"] = "111111"
	mapP["rememberClient"] = true
	params, _ := json.Marshal(mapP)
	fmt.Println(string(params))

	request, err := http.NewRequest("POST", authURL, bytes.NewBuffer(params))
	if err != nil {
		panic(err)
	}
	request.Header.Set("Content-Type", "application/json;charset=UTF-8")

	client := &http.Client{}
	resp, err := client.Do(request)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	fmt.Println("response status:	", resp.Status)
	body, _ := ioutil.ReadAll(resp.Body)
	// fmt.Println("response body: ", string(body))

	res := responseBody{}
	if err := json.Unmarshal([]byte(string(body)), &res); err != nil {
		panic(err)
	}
	token := res.Result.AccessToken
	fmt.Println(token)

	//将token加入Header，再请求业务接口
	getReq, err := http.NewRequest("GET", api, nil)
	if err != nil {
		panic(err)
	}
	getReq.Header.Set("Authorization", token)

	r, err := client.Do(getReq)
	if err != nil {
		panic(err)
	}
	defer r.Body.Close()
	body, err = ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	fmt.Printf("body= %s\n", string(body))
}

```


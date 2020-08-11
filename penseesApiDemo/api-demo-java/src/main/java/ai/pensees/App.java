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
    private final static String authUrl = "http://cloud.pensees-ai.com/api/TokenAuth/Authenticate";
    private final static String api = "http://pescloud-dev.pensees-ai.com:32080/terminal-tenant/tenant/dept/list?t=1596677312441";

    public static void main(String[] args) {
        System.out.println("Hello World!");
        String result = "";

        JSONObject inpuObject = new JSONObject();
        inpuObject.put("userNameOrEmailAddress", "admin");
        inpuObject.put("password", "!QAZ1qaz");
        // inpuObject.put("smsAuthCode", "111111");
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
        // String t = "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIxMyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzZWN1cml0eUFkbWluMiIsIkFzcE5ldC5JZGVudGl0eS5TZWN1cml0eVN0YW1wIjoiTTdMMk1SVklYWEtNUkxBVkg2SlNMQ0tETDVWTlJMNDciLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly93d3cuYXNwbmV0Ym9pbGVycGxhdGUuY29tL2lkZW50aXR5L2NsYWltcy90ZW5hbnRJZCI6IjE5MiIsInN1YiI6IjIxMyIsImp0aSI6ImFlMzg3YmEwLTIyNTEtNDg3MC05OWFkLTA0YjEwM2JkMWJmNSIsImlhdCI6MTU5NjYxMjk2OSwidGVuYW50SWQiOiIxOTIiLCJuYmYiOjE1OTY2MTI5NjksImV4cCI6MTU5NjY5OTM2OSwiaXNzIjoibnF2b2t1OWlHcFlhYTBicnRkUmVKclVlQXR5VWNITzMiLCJhdWQiOiJDaGFyb24ifQ.swiO7NhRVV4dTg00ANiZQ6t608Bzvq_RQFFPcLy5U8s";
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

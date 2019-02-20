package com.sun.frigg.common;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.NameValuePair;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

import sun.misc.BASE64Encoder;

public class JSONProxy {
	private static Logger logger = LoggerFactory.getLogger(JSONProxy.class);
	private static final CloseableHttpClient httpClient;
	public static final String CHARSET = "UTF-8";

	static {
		RequestConfig config = RequestConfig.custom().setConnectTimeout(30000).setSocketTimeout(15000).build();
		httpClient = HttpClientBuilder.create().setDefaultRequestConfig(config).build();
	}

	public static String get(String url, Map<String, String> params, Map<String, String> headers) {
		assert (StringUtils.hasLength(url));
		String result = null;
		try {
			HttpGet httpGet = new HttpGet(url);

			if (params != null && !params.isEmpty()) {
				url = addParameters(url, params);
			}

			if (headers != null && !headers.isEmpty()) {
				addHeader(headers, httpGet);
			}
			logger.debug("即将调用地址1:{}", url);

			RequestConfig requestConfig = RequestConfig.custom().setSocketTimeout(30000).setConnectTimeout(30000)
					.build();// 设置请求和传输超时时间
			httpGet.setConfig(requestConfig);

			CloseableHttpResponse response = httpClient.execute(httpGet);
			int statusCode = response.getStatusLine().getStatusCode();
			if (statusCode != 200) {
				httpGet.abort();
				logger.debug("HttpClient, Error code: {}, reason: {}", statusCode,
						response.getStatusLine().getReasonPhrase());
				throw new RuntimeException("访问远程失败：" + statusCode);
			}
			HttpEntity entity = response.getEntity();
			//如果是图片，返回base64格式流
			if(url.contains("api/nsite/updown/thumbnail")){
				return JSONProxy.getBase64Content(entity.getContent());
			}
			
			if (entity != null) {
				result = EntityUtils.toString(entity, CHARSET);
			}
			EntityUtils.consume(entity);
			response.close();
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return result;

	}
	public static String getBase64Content(InputStream inputStream) throws IOException{        
        byte[] output = steamToByte(inputStream);
        BASE64Encoder encoder = new BASE64Encoder();
        String outstr = encoder.encode(output);
        return outstr;        
    }
    public static byte[] steamToByte(InputStream input) throws IOException{
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        int len = 0;
        byte[] b = new byte[1024];
        while ((len = input.read(b, 0, b.length)) != -1) {                     
            baos.write(b, 0, len);
        }
        byte[] buffer =  baos.toByteArray();
        return buffer;
    }
	private static String addParameters(String url, Map<String, String> params)
			throws IOException, UnsupportedEncodingException {
		List<NameValuePair> pairs = new ArrayList<NameValuePair>(params.size());
		for (Map.Entry<String, String> entry : params.entrySet()) {
			String value = entry.getValue();
			if (value != null) {
				pairs.add(new BasicNameValuePair(entry.getKey(), value));
			}
		}
		url += "?" + EntityUtils.toString(new UrlEncodedFormEntity(pairs, CHARSET));
		return url;
	}

	private static void addHeader(Map<String, String> headers, HttpGet httpGet) {
		for (Map.Entry<String, String> entry : headers.entrySet()) {
			String value = entry.getValue();
			if (value != null) {
				httpGet.addHeader(entry.getKey(), value);
			}
		}
	}

	public static String postJson(String url, Map<String, String> urlParams, String jsonStr, Map<String, String> header)
			throws IOException {
		if (urlParams != null && !urlParams.isEmpty()) {
			List<NameValuePair> pairs = new ArrayList<NameValuePair>(urlParams.size());
			for (Map.Entry<String, String> entry : urlParams.entrySet()) {
				String value = entry.getValue();
				if (value != null) {
					pairs.add(new BasicNameValuePair(entry.getKey(), value));
				}
			}
			url += "?" + EntityUtils.toString(new UrlEncodedFormEntity(pairs, CHARSET));
		}
		HttpPost method = new HttpPost(url);
		if (header != null && !header.isEmpty()) {
			for (Map.Entry<String, String> entry : header.entrySet()) {
				String value = entry.getValue();
				if (value != null) {
					method.addHeader(entry.getKey(), value);
				}
			}

		}
		method.setEntity(new StringEntity(jsonStr, Charset.forName(CHARSET)));
		long startTime = System.currentTimeMillis();

		HttpResponse response = httpClient.execute(method);

		long endTime = System.currentTimeMillis();
		int statusCode = response.getStatusLine().getStatusCode();
		if (statusCode != HttpStatus.SC_OK) {
			logger.error("Method failed:{}", response.getStatusLine());
			throw new IOException("调用接口失败，代码：" + statusCode);
		}
		logger.debug("PostJSON耗时：{}，ms，{},", url, (endTime - startTime));

		// Read the response body
		String body = EntityUtils.toString(response.getEntity());

		return body;
	}
	
	public static String restPost(String url, String json) {
		RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        MediaType type = MediaType.parseMediaType("application/json; charset=UTF-8");
        headers.setContentType(type);
        headers.add("Accept", MediaType.APPLICATION_JSON.toString());
        long startTime = System.currentTimeMillis();
        org.springframework.http.HttpEntity<String> formEntity = new org.springframework.http.HttpEntity<String>(json, headers);

        String result = restTemplate.postForObject(url, formEntity, String.class);
        
        long endTime = System.currentTimeMillis();
        logger.debug("Rest PostJSON：{}，耗时：{}ms", url, (endTime - startTime));
        return result;
	}

	public static void main(String[] args) {
		
		try {
			Map<String, String> params = new HashMap<>();
			Date now = new Date();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			params.put("columnCode", "co8ad182873e631056013e8d1c355b0003");
			params.put("startTime", sdf.format(now));
			params.put("endTime", sdf.format(new Date(now.getTime() + 24 * 3600000)));
			String s = get("http://172.20.152.248:8080/UserInterFace/rest/s/llist/getLlistByconditionsQuery.json",
					params, null);
			System.out.println(s);
		} catch (Exception e) {
			logger.debug(e.getMessage(), e);
		}
	}
}

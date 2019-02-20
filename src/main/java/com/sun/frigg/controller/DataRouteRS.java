package com.sun.frigg.controller;

import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.frigg.common.JSONProxy;
/**
 *此类作为后台路由使用，现在主要使用route接口，其他接口暂留 
 **/
@RequestMapping("/data")
@RestController
public class DataRouteRS {

	private static Logger logger = LoggerFactory.getLogger(DataRouteRS.class);

	private static String principal;

	private static String password;

	@Value("${central.data.access:}")
	private String access;

	@Value("${central.data.access.key:}")
	private String accessKey;

	@Value("${central.data.access.secret:}")
	private String accessSecret;

	private final ObjectMapper mapper = new ObjectMapper();

	private static String oldSessionId;

	private static RestTemplate _template = new RestTemplate(new HttpComponentsClientHttpRequestFactory());

	@Value("${central.principal:}")
	public void setPrincipal(String principal) {
		DataRouteRS.principal = principal;
	}

	@Value("${central.password:}")
	public void setPassword(String password) {
		DataRouteRS.password = password;
	}

	@RequestMapping(value = "/route", method = { RequestMethod.GET })
	public Map<?, ?> get(@RequestParam("url") String url) throws IOException {
		String result = JSONProxy.get(url, null, null);
		Map<?, ?> ret = new ObjectMapper().readValue(result, Map.class);
		return ret;
	}

	@RequestMapping(value = "/route", method = { RequestMethod.POST })
	public String postStr(@RequestBody Map<String, Object> param, @RequestParam("url") String url) throws IOException {

		Map<String, Object> extra = this.signature();
		if (extra.size() > 0) {
			// param.putAll(extra);
			extra.put("para", param);
		} else {
			extra = param;
		}

		String json = new ObjectMapper().writeValueAsString(extra);
		logger.debug(json);
		// Map<String, String> header = new HashMap<>();
		// header.put("Content-type", "application/json; charset=utf-8");
		// header.put("Accept", "application/json");
		// String result = JSONProxy.postJson(url, header, json, null);
		String result = JSONProxy.restPost(url, json);
		// String result = JSONProxy.restPostFormData(url, json);
		return result;
	}

	@RequestMapping(value = "/routeHeader", method = { RequestMethod.GET })
	public String getHeader(@RequestHeader("url") String url) throws IOException {
		String result = JSONProxy.get(url, null, null);
//		Map<?, ?> ret = new ObjectMapper().readValue(result, Map.class);
		return result;
	}

	@RequestMapping(value = "/comb/assets", method = { RequestMethod.POST })
	public String postStrLogin(@RequestBody Map<String, Object> param, @RequestParam("url") String url)
			throws IOException {
		String json = mapper.writeValueAsString(param);
		Map<String, String> header = new HashMap<>();
		header.put("Content-type", "application/json;charset=UTF-8");
		header.put("Accept", "application/json, text/plain, */*");
		header.put("Cookie", "sid=" + getSessionId(url) + "; portal.LastSessionUser=admin");
		logger.debug("Header:{}", new ObjectMapper().writeValueAsString(header));
		String result = JSONProxy.postJson(url + "/ns/api/nsite/mobjects/search/assets", null, json, header);
		logger.debug("查询结果：{}", result);
		return result;
	}

	@RequestMapping(value = "/comb/get", method = { RequestMethod.POST })
	public String postGet(@RequestBody Map<String, String> param, @RequestParam("url") String url) throws IOException {
		Map<String, String> header = new HashMap<>();
		header.put("Content-type", "application/json;charset=UTF-8");
		header.put("Accept", "application/json, text/plain, */*");
		header.put("Cookie", "sid=" + getSessionId(url) + "; portal.LastSessionUser=admin");
		logger.debug("Header:{}", mapper.writeValueAsString(header));
		String result = JSONProxy.get(url + "/ns/api/nsite/mobjects/get", param, header);
		logger.debug("查询结果：{}", result);
		return result;
	}

	@RequestMapping(value = "/comb", method = { RequestMethod.GET })
	public String getComb(@RequestParam("url") String url, @RequestParam("param") String param) throws IOException {
		Map<String, String> header = new HashMap<>();
		header.put("Content-type", "application/json;charset=UTF-8");
		header.put("Accept", "application/json, text/plain, */*");
		header.put("Cookie", "sid=" + getSessionId(url) + "; portal.LastSessionUser=admin");
		logger.debug("Header:{}", mapper.writeValueAsString(header));
		String result = JSONProxy.get((url + param), null, header);
		logger.debug("查询结果：{}", result);
		return result;
	}

	// 获取记者稿件数
	@RequestMapping(value = "/getUserTitle", method = { RequestMethod.GET })
	public String getUserTitle(@RequestParam("url") String url, @RequestParam("startTime") String startTime,
			@RequestParam("endTime") String endTime, @RequestParam String column) throws IOException {
		Map<String, String> header = new HashMap<>();
		header.put("Content-type", "application/json;charset=UTF-8");
		header.put("Accept", "application/json, text/plain, */*");
		header.put("Cookie", "sid=" + getSessionId(url) + "; portal.LastSessionUser=admin");
		logger.debug("Header:{}", mapper.writeValueAsString(header));
		String urlFinal = url + "/ns/api/common/dataCenterStatistics/find/record/based/on/roles?" + "columnName="
				+ column + "&endTime=" + endTime + "&limit=30&name=&role=author&start=0&startTime=" + startTime;
		String result = JSONProxy.get(urlFinal, null, header);
		logger.debug("查询结果：{}", result);
		return result;
	}

	// 获取栏目
	@RequestMapping(value = "/getColumn", method = { RequestMethod.GET })
	public String getUserTitle(@RequestParam String url) throws IOException {
		Map<String, String> header = new HashMap<>();
		header.put("Content-type", "application/json;charset=UTF-8");
		header.put("Accept", "application/json, text/plain, */*");
		header.put("Cookie", "sid=" + getSessionId(url) + "; portal.LastSessionUser=admin");
		logger.debug("Header:{}", mapper.writeValueAsString(header));
		String urlFinal = url + "/ns/api/common/uc/find/all/groups";
		String result = JSONProxy.get(urlFinal, null, header);
		logger.debug("查询结果：{}", result);
		return result;
	}

	// ns用户id->name
	@RequestMapping(value = "/findName", method = { RequestMethod.GET })
	public String findName(@RequestParam("url") String url) throws IOException {
		Map<String, String> header = new HashMap<>();
		header.put("Content-type", "application/json;charset=UTF-8");
		header.put("Accept", "application/json, text/plain, */*");
		header.put("Cookie", "sid=" + getSessionId(url) + "; portal.LastSessionUser=admin");
		logger.debug("Header:{}", mapper.writeValueAsString(header));
		String result = JSONProxy.get(url + "/ns/api/common/uc/find/all/users", null, header);
		logger.debug("查询结果：{}", result);
		return result;
	}

	// 获取ns用户头像
	@RequestMapping(value = "/comb/getUserImg", method = { RequestMethod.GET })
	public String getUserImg(@RequestParam("url") String url, @RequestParam("userId") String userId)
			throws IOException {
		Map<String, String> header = new HashMap<>();
		header.put("Content-type", "application/json;charset=UTF-8");
		header.put("Accept", "application/json, text/plain, */*");
		header.put("Cookie", "sid=" + getSessionId(url) + "; portal.LastSessionUser=admin");
		logger.debug("Header:{}", mapper.writeValueAsString(header));
		String result = JSONProxy.get(url + "/central/api/nsite/updown/thumbnail?thumbnailId=user-" + userId
				+ "&size=L&nocache=true&_=" + new Date().getTime(), null, header);
//		logger.debug("查询结果：{}", result);
		return result;
	}

	// 获取栏目owerId和中文名称对应关系
	@RequestMapping(value = "/getOwerId2Name", method = { RequestMethod.GET })
	public String getOwerId2Name(@RequestParam("url") String url) throws IOException {
		Map<String, String> header = new HashMap<>();
		header.put("Content-type", "application/json;charset=UTF-8");
		header.put("Accept", "application/json, text/plain, */*");
		header.put("Cookie", "sid=" + getSessionId(url) + "; portal.LastSessionUser=admin");
		logger.debug("Header:{}", mapper.writeValueAsString(header));
		String result = JSONProxy.get(url + "/ns/api/common/uc/find/all/groups", null, header);
//		logger.debug("查询结果：{}", result);
		return result;
	}

	// 获取栏目稿件
	@RequestMapping(value = "/getColumnTitle", method = { RequestMethod.GET })
	public String getColumnTitle(@RequestParam("url") String url,
			@RequestParam("createdTimeBegin") String createdTimeBegin,
			@RequestParam("createdTimeEnd") String createdTimeEnd) throws IOException {
		Map<String, String> header = new HashMap<>();
		header.put("Content-type", "application/json;charset=UTF-8");
		header.put("Accept", "application/json, text/plain, */*");
		header.put("Cookie", "sid=" + getSessionId(url) + "; portal.LastSessionUser=admin");
		logger.debug("Header:{}", mapper.writeValueAsString(header));
		String result = JSONProxy.get(
				url + "/ns/api/mobjectStatistics/mobjectStatisticsRS/staticticsAssetCount?createdTimeBegin="
						+ createdTimeBegin + "&createdTimeEnd=" + createdTimeEnd + "&isDate=false&isGroup=true&userId=",
				null, header);
//		logger.debug("查询结果：{}", result);
		return result;
	}

	// webrtc用
	@RequestMapping(value = "/createLR", method = { RequestMethod.POST })
	public String createLR(@RequestBody Map<String, Object> param, @RequestParam("url") String url) throws IOException {
		Map<String, String> header = new HashMap<>();
		String json = mapper.writeValueAsString(param);
		header.put("Content-type", "application/json;charset=UTF-8");
		header.put("Accept", "application/json, text/plain, */*");
		header.put("Cookie", "sid=" + getSessionId(url) + "; portal.LastSessionUser=admin");
		logger.debug("Header:{}", mapper.writeValueAsString(header));
		String result = JSONProxy.postJson(url + "/ns/api/live/room/createLR", null, json, header);
		logger.debug("查询结果：{}", result);
		return result;
	}

	@RequestMapping(value = "/userSig", method = { RequestMethod.GET })
	public String userSig(@RequestParam("url") String url, @RequestParam("userId") String userId) throws IOException {
		Map<String, String> header = new HashMap<>();
		header.put("Content-type", "application/json;charset=UTF-8");
		header.put("Accept", "application/json, text/plain, */*");
		header.put("Cookie", "sid=" + getSessionId(url) + "; portal.LastSessionUser=admin");
		logger.debug("Header:{}", mapper.writeValueAsString(header));
		String result = JSONProxy.get(url + "/ns/api/live/tencent/sigVerity?userId=" + userId, null, header);
		logger.debug("查询结果：{}", result);
		return result;
	}

	@RequestMapping(value = "/remove", method = { RequestMethod.GET })
	public String remove(@RequestParam("url") String url, @RequestParam("id") String id) throws IOException {
		Map<String, String> header = new HashMap<>();
		header.put("Content-type", "application/json;charset=UTF-8");
		header.put("Accept", "application/json, text/plain, */*");
		header.put("Cookie", "sid=" + getSessionId(url) + "; portal.LastSessionUser=admin");
		logger.debug("Header:{}", mapper.writeValueAsString(header));
		String result = JSONProxy.get(url + "/ns/api/live/room/user/remove?id=" + id, null, header);
		logger.debug("查询结果：{}", result);
		return result;
	}

	public Map<String, Object> signature() {
		Map<String, Object> param = new HashMap<>();
		if (StringUtils.hasLength(access)) {
			switch (access) {
			case "lsg":
				param.put("accessKeyId", accessKey);
				long random = (long) ((Math.random() * 9 + 1) * 100000) * 10000;
				param.put("random", random);
				long time = new Date().getTime() / 1000;
				param.put("time", time);
				param.put("sig", this.sha256(random, time));
				break;
			default:
				break;
			}
		}
		return param;
	}

	private String sha256(long random, long time) {
		String src = "accessKeySecret=" + accessSecret + "&random=" + random + "&time=" + time + "&accessKeyId="
				+ accessKey;
		try {
			MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
			messageDigest.update(src.getBytes());
			byte byteBuffer[] = messageDigest.digest();
			StringBuffer strHexString = new StringBuffer();
			for (int i = 0; i < byteBuffer.length; i++) {
				String hex = Integer.toHexString(0xff & byteBuffer[i]);
				if (hex.length() == 1) {
					strHexString.append('0');
				}
				strHexString.append(hex);
			}
			return strHexString.toString();
		} catch (NoSuchAlgorithmException e) {
			logger.error(e.getMessage(), e);
		}
		return null;
	}

	public static synchronized String getSessionId(String url) throws IOException {
		// 这里缓存一下上次登录得到的会话，Noop一下如果没失效就接着用
		// 一旦失效了，就重新登录。

		if (StringUtils.hasLength(oldSessionId)) {
			try {
				HttpHeaders headers = new HttpHeaders();
				headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
				headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON_UTF8));
				// TODO 将来换成token模式
				logger.debug("POST {}", url + "/ns/api/nsite/authc/noop/session");
				_template.getForEntity(url + "/ns/api/nsite/authc/noop/session?_=" + System.currentTimeMillis()
						+ "&sid=" + oldSessionId, Void.class);
				logger.debug("NOOP the old sessionid still valid: {}", oldSessionId);
				return oldSessionId;
			} catch (Throwable e) {
				if (e instanceof HttpClientErrorException) {
					HttpStatus code = ((HttpClientErrorException) e).getStatusCode();
					if (code == HttpStatus.FORBIDDEN) {
						logger.warn("noop session was forbidden, old sessionid maybe expired: {}", oldSessionId);
						oldSessionId = null;
					} else {
						throw e;
					}
				} else {
					throw e;
				}
			}
		}

		String lstr = "{\"principal\": \"" + principal + "\",\"password\": \"" + password
				+ "\",\"principalType\": \"UserID\",\"appName\": \"arena\"}";
		Map<String, String> header1 = new HashMap<>();
		header1.put("Content-type", "application/json;charset=UTF-8");
		header1.put("Accept", "application/json, text/plain, */*");
		logger.debug("POST {}", url + "/ns/api/nsite/authc/logon");
		String lout = JSONProxy.postJson(url + "/ns/api/nsite/authc/logon", null, lstr, header1);
		// logger.debug("登录结果：{}", lout);
		if (StringUtils.hasLength(lout)) {
			logger.debug("登录结果：有值太长，此处省略");
		} else {
			logger.warn("登录结果：空");
		}
		@SuppressWarnings("unchecked")
		Map<String, String> session = new ObjectMapper().readValue(lout, Map.class);

		oldSessionId = session.get("sessionId");
		logger.debug("got new sessionid: {}", oldSessionId);
		return oldSessionId;
	}
}

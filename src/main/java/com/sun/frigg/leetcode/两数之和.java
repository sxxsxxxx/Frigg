package com.sun.frigg.leetcode;

import java.util.HashMap;

/**
 * 判断数组两数之和的为指定值的两个数字的位置
 * @author mac
 */
public class 两数之和 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		test();
	}
	
	public static void test() {
		int [] arr = {1,3,5,6,8};
		int target = 9;
		//建立map
		HashMap<Integer, Integer> map = new HashMap<Integer, Integer>();
		for (int i = 0; i < arr.length; i++) {
			map.put(arr[i], i);
		}
		for (int i = 0; i < arr.length; i++) {
			int temp = target - arr[i];
			if(temp > 0 && map.containsKey(temp)) {
				if(map.get(temp)>i)
				System.out.println(i +"," + map.get(temp)+";");
			}
		}
	}

}

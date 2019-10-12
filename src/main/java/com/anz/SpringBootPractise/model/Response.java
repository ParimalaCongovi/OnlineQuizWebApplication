package com.anz.SpringBootPractise.model;

import lombok.Data;

@Data
public class Response {
	
	private String status;
	private Object data;
	
	//Default Constructor.
	public Response()
	{
		
	}
	
	//Parameterized Constructor.
	public Response(String status,Object data)
	{
		this.status=status;
		this.data=data;
	}
	
}

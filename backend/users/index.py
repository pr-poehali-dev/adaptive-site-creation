'''
Business: API для регистрации пользователей
Args: event - dict с httpMethod, body
      context - object с attributes: request_id
Returns: HTTP response dict
'''

import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    cursor = conn.cursor()
    
    try:
        cursor.execute('''
            INSERT INTO users (parent_name, parent_phone, child_name, school, grade)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id
        ''', (
            body_data['parent_name'],
            body_data['parent_phone'],
            body_data['child_name'],
            body_data['school'],
            body_data['grade']
        ))
        new_id = cursor.fetchone()[0]
        conn.commit()
        
        return {
            'statusCode': 201,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'id': new_id, 'message': 'User registered successfully'}),
            'isBase64Encoded': False
        }
    
    finally:
        cursor.close()
        conn.close()

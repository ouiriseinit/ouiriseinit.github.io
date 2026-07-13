#!/usr/bin/env python3
"""
Simple GBP Data Extractor
"""

import re
import csv

def parse_gbp_text(text):
    """Parse GBP text into structured data"""
    businesses = []
    lines = text.strip().split('\n')
    
    current_business = {}
    i = 0
    
    while i < len(lines):
        line = lines[i].strip()
        
        if not line:
            i += 1
            continue
        
        # Look for business name (line before rating)
        if i + 1 < len(lines):
            next_line = lines[i + 1].strip()
            # Check if next line has rating pattern
            if re.match(r'^\d\.\d\(\d+', next_line):
                current_business = {'business_name': line}
                i += 1
                continue
        
        # Process rating line
        rating_match = re.match(r'^(\d\.\d)\(([\d,]+)\)', line)
        if rating_match and current_business:
            current_business['rating'] = rating_match.group(1)
            current_business['review_count'] = rating_match.group(2).replace(',', '')
            i += 1
            continue
        
        # Process category and address
        if ' · ' in line and current_business:
            parts = [p.strip() for p in line.split(' · ') if p.strip()]
            if len(parts) >= 2:
                if 'category' not in current_business:
                    current_business['category'] = parts[0]
                    current_business['address'] = ' · '.join(parts[1:])
            i += 1
            continue
        
        # Process hours and phone
        hours_phone_match = re.search(r'(.+?) · (.+?) · (.+)', line)
        if hours_phone_match and current_business:
            current_business['hours'] = hours_phone_match.group(1)
            current_business['phone'] = hours_phone_match.group(3)
            i += 1
            continue
        
        # Process website indicator
        if '' in line and i + 1 < len(lines) and 'Website' in lines[i + 1]:
            current_business['has_website'] = 'Yes'
            i += 2
            continue
        
        # Process review text
        if line.startswith('"') and line.endswith('"'):
            current_business['review'] = line[1:-1]
            # End of current business, save it
            if current_business:
                businesses.append(current_business)
                current_business = {}
        
        i += 1
    
    # Add last business if exists
    if current_business:
        businesses.append(current_business)
    
    return businesses

def main():
    # Read input
    with open('clean.txt', 'r', encoding='utf-8') as f:
        text = f.read()
    
    # Parse businesses
    businesses = parse_gbp_text(text)
    
    # Define CSV columns
    columns = ['business_name', 'rating', 'review_count', 'category', 
               'address', 'hours', 'phone', 'has_website', 'review']
    
    # Write to CSV
    with open('gbp_data.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=columns)
        writer.writeheader()
        writer.writerows(businesses)
    
    print(f"Extracted {len(businesses)} businesses to gbp_data.csv")
    
    # Show sample
    if businesses:
        print("\nSample of first 3 businesses:")
        for i, biz in enumerate(businesses[:3], 1):
            print(f"\n{i}. {biz.get('business_name', 'N/A')}")
            print(f"   Rating: {biz.get('rating', 'N/A')} ({biz.get('review_count', '0')} reviews)")
            print(f"   Category: {biz.get('category', 'N/A')}")
            print(f"   Address: {biz.get('address', 'N/A')}")

if __name__ == "__main__":
    main()
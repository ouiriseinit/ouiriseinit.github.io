# agents/ouirise/totxt.py (updated for your request)

def clean_ascii(text):
    # Keep only ASCII characters
    return bytes(text, 'utf-8').decode('ascii', errors='ignore')

def main():
    # Read from raw_data.txt and write cleaned text to clean.txt
    try:
        with open('raw_data.txt', 'r', encoding='utf-8') as fin:
            raw_text = fin.read()
        clean_text = clean_ascii(raw_text)
        # Overwrite or create clean.txt
        with open('clean.txt', 'w', encoding='utf-8') as fout:
            fout.write(clean_text)
        print("Cleaned text written to clean.txt")
    except FileNotFoundError:
        print("Error: 'raw_data.txt' not found.", file=sys.stderr)
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)

    

if __name__ == "__main__":
    import sys
    main()
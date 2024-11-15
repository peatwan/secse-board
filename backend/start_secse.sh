# Set the config file from the first argument
config=$1

# Run the Python script in the background, logging output and errors to nohup.out
nohup python "$SECSE/run_secse.py" --config "$config" > /dev/null 2>&1 &

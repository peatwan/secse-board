# Set flag from the first argument
flag=$1

# Find PIDs matching the flag
pids=$(ps aux | grep "$flag" | grep -v grep |grep -v stop_secse.sh | awk '{print $2}')

if [ -n "$pids" ]; then
  # Attempt to terminate the processes gracefully first
  echo "$pids" | xargs kill -15
  sleep 2  # Give processes some time to terminate

  # Forcefully kill any remaining processes
  if ps -p $pids > /dev/null 2>&1; then
    echo "$pids" | xargs kill -9
    echo "Processes for '$flag' were forcefully terminated."
  else
    echo "Processes for '$flag' were terminated gracefully."
  fi
else
  echo "No processes found for '$flag'."
fi


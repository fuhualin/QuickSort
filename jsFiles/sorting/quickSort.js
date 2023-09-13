urlpseudo = "./jsFiles/sorting/algoCode/quickSort";
urlcpp = "./jsFiles/sorting/algoCode/quickSort.cpp";
urljava = "./jsFiles/sorting/algoCode/quickSort.java";
urlpython = "./jsFiles/sorting/algoCode/quickSort.py";
d3.select("#algo-name").text("Quick Sort (Pivot first element)");
displayCodeFromFile(urlpseudo);
sortData();

function swap(i, j)
{
    var temp = dataSet[i];
    dataSet[i] = dataSet[j]; 
    dataSet[j] = temp;
}
//quickSort
function sorting()
{
    if(playIndex >= 0 && playIndex<record.length )
    {
        dataSet = cloneData(record[playIndex]);
        hline = extraRecord[playIndex][0];
        strAction = extraRecord[playIndex][1];
        if(urlindex == 0) highlightCode(hline);
        actionLabel(strAction);
        redrawBars(dataSet);
        playIndex++;
    }
    else
    {
        clearInterval(timer);
    }
}

function init()
{
    initPlay = false;
    for(var k = 0; k< num; k++)
    {
        dataSet[k].state = states.default;
    }
}

function sortData()
{
    record = []; extraRecord = []; hline = -1; playIndex = 0;
    strAction = "Starting to Sort";
    recordData(dataSet);
    var left = 0, right = dataSet.length - 1, sortFlag = false;

    function setActive(left, right)
    {
        for(var k = 0; k<dataSet.length; k++)
        {
            if(dataSet[k].state === states.sorted) continue;
            if(k < left || k>right) dataSet[k].state = states.inactive;
            else dataSet[k].state = states.default;
        }
    }

    function partition(left, right)
    {
        dataSet[left].state = states.minimum;
        var pivot = {value: dataSet[left].value, state: dataSet[left].state};   
        strAction = "Setting " + pivot.value + " as pivot.";
        recordData(dataSet);

        var j = right+1;
        for(var i = right; i>left; i--)
        {
            if(i+1 <= right) dataSet[i+1].state = states.default;
            dataSet[i].state = states.compare; 
            strAction = "Comparing " + dataSet[i].value + " with pivot value " + pivot.value + ".";
            recordData(dataSet);
            if(dataSet[i].value >= pivot.value)
            {
                j--;
                dataSet[i].state = states.swapping;
                dataSet[j].state = states.swapping;
                strAction = "Swapping " + dataSet[i].value + " with rightmost unswapped value: " + dataSet[j].value + ".";
                recordData(dataSet);
                swap(i,j); recordData(dataSet);
                dataSet[j].state = states.default;
                dataSet[i].state = states.compare;
                recordData(dataSet);
            }
            if(i == left+1) dataSet[i].state = states.default;
        }
        dataSet[left].state = states.swapping;
        dataSet[j-1].state = states.swapping;
        strAction = "Putting pivot value " + dataSet[left].value + " at its sorted position by swapping with " + dataSet[j-1].value + ".";
        recordData(dataSet);
        swap(left, j-1); recordData(dataSet);

        strAction = dataSet[j-1].value + " has been sorted.";
        dataSet[left].state = states.default;
        dataSet[j-1].state = states.sorted;
        recordData(dataSet);
        return (j-1);
    }

    function quickSort(left, right)
    {
        if(left < right)
        {
            var pivot = partition(left, right);

            strAction = "Active Region: [" + (left+1) + ", " + (pivot) + "].";
            setActive(left, pivot-1);
            recordData(dataSet);
            quickSort(left, pivot - 1);
            
            strAction = "Active Region: [" + (pivot+2) + ", " + (right+1) + "].";
            setActive(pivot+1, right);
            recordData(dataSet);
            quickSort(pivot+1, right); 
        }
        else if(left == right)
        {
            strAction = dataSet[left].value + " has been sorted.";
            dataSet[left].state = states.sorted;
            recordData(dataSet);
        }
    }
    quickSort(left, right);
    strAction = "All data has been sorted."; 
    recordData(dataSet);
    console.log("sorting has been completed");
}

function startSort(firstPlay) // if firstPlay is true then playing, else its resume
{
    if(firstPlay === true) init();
    timer = setInterval(function() { sorting() }, speed );   
}



let count = 0;

const sleep = (n) => new Promise(resolve => setTimeout(resolve, n));
const getData = async () => {
    await sleep(500);
    return Promise.resolve(++count);
}

const memoize = (fn, lifetime) => {
    let
        cache,
        timer;

    return () => {
        if (cache) {
            timer = setTimeout(() => {
                cache = null;
                clearTimeout(timer);
            }, lifetime);

            return cache;
        }

        cache = fn();
        return cache;
    };
}

const getJsonMemoize = memoize(getData, 100);

(async () => {
    await sleep(300);
    console.log(await getJsonMemoize()); // 1
    console.log(await getJsonMemoize()); // 1
    await sleep(300);
    console.log(await getJsonMemoize()); // 2
    console.log(await getJsonMemoize()); // 2
    await sleep(300);
    console.log(await getJsonMemoize()); // 3
    console.log(await getJsonMemoize()); // 3
})();

fetchWithRetry(() => Promise.reject('ffdfdf'), {
    retry: (i) => {
        console.log(i);
        if (i < 5) {
            return i * 1e3;
        }
        return false;
    }
}).catch(console.error);

function fetchWithRetry(exec, opts= {}) {
    let counter = 0;

    exec().catch(err => {

    })

    return innerExec();
    function innerExec() {
        return exec().catch(err => {
            counter++;

            if (opts.retry == null) {
                throw err;
            }

            const delay = opts.retry(counter);

            switch (delay) {
                case true: return innerExec();
                case false: throw err;
                default:
                    return new Promise(resolve => {
                        setTimeout(() => resolve(innerExec()), delay);
                    });
            }
        })
    }
}
